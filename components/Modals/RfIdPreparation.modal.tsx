import {
  Box,
  Button,
  Modal,
  Stack,
  Text,
  Title,
  createStyles,
  keyframes,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import ScannerIllustration from '@/assets/svg/scanner.svg';
import { IconCircleCheck, IconFaceIdError } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setModalPrepare } from '@/stores/features/modal/modal.slice';
import { useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { CustomerService } from '@/services/customer.services';
import { RfIdService } from '@/services/rfid.services';

const scan = keyframes({
  'from, to': { top: '50%' },
  '30%, 33%': { top: '87%' },
  '70%, 73%': { top: '10%' },
});

const modalScannerStyles = createStyles((theme, _params, getRef) => ({
  scannerMessage: {
    textAlign: 'center',
    paddingLeft: 50,
    paddingRight: 50,
  },
  iconSuccess: {
    color: theme.colors.green[5],
  },
  iconError: {
    color: theme.colors.red[5],
  },
}));

const COUNTER = 3;

export function RFIdPreparation() {
  const { classes } = modalScannerStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    modalPrepare: { visibility, data },
  } = useAppSelector(state => state.modals);

  const modalType = data?.type;

  const idleMessage = data?.message.filter(v => v.type === 'idle')[0];
  const loadingMessage = data?.message.filter(v => v.type === 'loading')[0];
  const successMessage = data?.message.filter(v => v.type === 'success')[0];
  const availableMessage = data?.message.filter(v => v.type === 'available')[0];
  const errorMessage = data?.message.filter(v => v.type === 'error')[0];

  const [enableToScan, setEnableToScan] = useState<boolean>(false);
  const [errorScan, setErrorScan] = useState<boolean>(false);
  const [successScan, setSuccessScan] = useState<boolean>(false);
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

  const { refetch: refetchResetRfId } = useQuery({
    queryKey: ['RfIdReset'],
    queryFn: RfIdService.resetAvailableRfId,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const handleCloseModal = useCallback(() => {
    dispatch(
      setModalPrepare({
        visibility: false,
        data: undefined,
      })
    );
    setSuccessScan(false);
    setCounter(COUNTER);
  }, [dispatch]);

  const handleSuccess = useCallback(() => {
    handleCloseModal();
    remove();
    if (modalType === 'create-customer') {
      router.push(`/customers/${fetchData?.data?.rfid}`);
    }
  }, [handleCloseModal, modalType, router, fetchData?.data?.rfid, remove]);

  useEffect(() => {
    if (enableToScan) {
      const interval = setInterval(() => {
        refetchAvailableToRegister();
      }, 5000);
      const timeOut = setTimeout(() => {
        setEnableToScan(false);
      }, 10000);
      return () => {
        clearTimeout(timeOut);
        clearInterval(interval);
      };
    }
  }, [enableToScan, refetchAvailableToRegister]);

  useEffect(() => {
    if (fetchData?.status === 1 && counter !== 0) {
      setEnableToScan(false);
      const interval = setInterval(() => {
        setCounter(prev => prev - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [fetchData?.status, counter]);

  useEffect(() => {
    if (counter === 0 && visibility) {
      handleSuccess();
    }
  }, [counter, handleCloseModal, handleSuccess, router, visibility]);

  const renderMessage = (status: number | undefined) => {
    switch (status) {
      case 1:
        return (
          //  success message
          <>
            <Text weight="bold" transform="capitalize">
              {successMessage?.message.title}
            </Text>
            <Text>{successMessage?.message.text}</Text>
          </>
        );

      case 2:
        return (
          //  available data message
          <>
            <Text weight="bold" transform="capitalize">
              {availableMessage?.message.title}
            </Text>
            <Text>{availableMessage?.message.text}</Text>
          </>
        );

      case 3:
        return (
          //  error scanner message
          <>
            <Text weight="bold" transform="capitalize">
              {errorMessage?.message.title}
            </Text>
            <Text>{errorMessage?.message.text}</Text>
          </>
        );

      default:
        return (
          // idle message
          <>
            <Text weight="bold" transform="capitalize">
              {idleMessage?.message.title}
            </Text>
            <Text>{idleMessage?.message.text}</Text>
          </>
        );
    }
  };

  return (
    <Modal
      centered
      opened={visibility}
      onClose={handleCloseModal}
      withCloseButton={false}
      overflow="inside"
    >
      <Stack align="center" my={45}>
        <Title order={3} transform="uppercase">
          {fetchData?.status === 1 ? 'Sukses' : 'Pindai kartu'}
        </Title>
        <Box>
          {enableToScan ? (
            <RFIDScanner enableToScan={enableToScan} />
          ) : fetchData?.status === 1 ? (
            <IconCircleCheck size={200} className={classes.iconSuccess} />
          ) : fetchData?.status === 3 ? (
            <IconFaceIdError size={200} className={classes.iconError} />
          ) : (
            <RFIDScanner enableToScan={enableToScan} />
          )}
        </Box>
        <Stack align="center" spacing="xl">
          <Stack align="center" spacing="xs" className={classes.scannerMessage}>
            {enableToScan ? (
              // loading message
              <>
                <Text weight="bold" transform="capitalize">
                  {loadingMessage?.message.title}
                </Text>
                <Text>{loadingMessage?.message.text}</Text>
              </>
            ) : (
              renderMessage(fetchData?.status)
            )}
          </Stack>

          {fetchData?.status === 1 ? (
            <Button color="green" onClick={handleSuccess}>
              Lanjutkan {counter !== 0 && counter}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEnableToScan(true);
                refetchAvailableToRegister();
                // refetchResetRfId();
              }}
              loading={enableToScan}
            >
              {enableToScan
                ? 'Memindai'
                : errorScan
                ? 'Coba Lagi'
                : 'Pindai Sekarang'}
            </Button>
          )}
        </Stack>
      </Stack>
      {/* Modal content */}
    </Modal>
  );
}

interface IPropRFIDScanner {
  enableToScan?: boolean;
}

function RFIDScanner({ enableToScan }: IPropRFIDScanner) {
  const { classes } = scannerStyles();

  return (
    <Box className={classes.wrapper}>
      <ScannerIllustration className={classes.baseScanner} />
      {enableToScan && <div className={classes.horizontalLine} />}
    </Box>
  );
}

export default RFIDScanner;

const scannerStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  baseScanner: {
    width: '100%',
  },
  horizontalLine: {
    position: 'absolute',
    top: 0,
    width: '98%',
    height: '6px',
    borderRadius: '7px',
    backgroundColor: '#475467',
    animation: `${scan} 3s ease-in-out infinite`,
  },
}));
