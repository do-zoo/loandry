import { CustomerService } from '@/services/customer.services';
import { RfIdService } from '@/services/rfid.services';
import { KeyOfResponseStatus } from '@/variables/response-status';
import { Box, createStyles, Modal, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import RfIdScannerMessage, {
  ModalButton,
  ModalIllustration,
  ModalTitle,
} from './_BaseRfId.modal';

const modalScannerStyles = createStyles((theme, _params, getRef) => ({
  scannerMessage: {
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
}));

const COUNTER = 3;

interface IProps {
  opened: boolean;
  onClose: () => void;
  counter?: number;
}

export function CreateCustomerModal({ onClose, opened }: IProps) {
  const { classes } = modalScannerStyles();
  const router = useRouter();

  const [status, setStatus] = useState<KeyOfResponseStatus>('idle');

  const [counter, setCounter] = useState<number>(COUNTER);

  const {
    data: fetchData,
    refetch: refetchAvailableToRegister,
    remove,
  } = useQuery({
    queryKey: ['availableToRegister'],
    queryFn: CustomerService.availableToRegister,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { mutateAsync: handleDeleteRfId } = useMutation({
    mutationFn: RfIdService.resetAvailableRfId,
  });

  const handleCloseModal = useCallback(() => {
    onClose();
    setCounter(COUNTER);
    remove();
    setStatus('idle');
  }, [onClose, remove]);

  const handleSuccess = useCallback(async () => {
    handleCloseModal();
    remove();
    router.push(
      {
        pathname: '/customers/new',
        query: {
          id: fetchData?.data?.rfid,
        },
      },
      '/customers/new',
      { shallow: true }
    );
  }, [
    handleCloseModal,
    remove,
    // handleDeleteRfId,
    router,
    fetchData?.data?.rfid,
  ]);

  useEffect(() => {
    if (status === 'loading') {
      const interval = setInterval(() => {
        refetchAvailableToRegister();
      }, 1000);
      const timeOut = setTimeout(() => {
        setStatus(fetchData?.status ?? 'error');
      }, 10000);
      return () => {
        clearTimeout(timeOut);
        clearInterval(interval);
      };
    }
  }, [status, refetchAvailableToRegister, fetchData?.status]);

  useEffect(() => {
    if (fetchData?.status === 'success' || fetchData?.status === 'card-used') {
      setStatus(fetchData?.status);
      if (fetchData?.status === 'success' && counter !== 0) {
        const interval = setInterval(() => {
          setCounter(prev => prev - 1);
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [fetchData?.status, counter]);

  useEffect(() => {
    if (counter === 0 && opened) {
      handleSuccess();
    }
  }, [counter, handleSuccess, opened]);

  return (
    <Modal
      centered
      opened={opened}
      onClose={handleCloseModal}
      overflow="inside"
      withCloseButton={false}
    >
      <Stack align="center" my={45}>
        <ModalTitle status={status} />
        <Box>
          <ModalIllustration status={status} />
        </Box>
        <Stack align="center" spacing="xl">
          <Stack align="center" spacing="xs" className={classes.scannerMessage}>
            <RfIdScannerMessage status={status} />
          </Stack>

          <ModalButton
            handleSuccess={handleSuccess}
            status={status}
            onClick={() => {
              handleDeleteRfId(undefined, {
                onSuccess: () => {
                  refetchAvailableToRegister();
                  setStatus('loading');
                },
              });
            }}
          />
        </Stack>
      </Stack>
      {/* Modal content */}
    </Modal>
  );
}
