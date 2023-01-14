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
import { IconCircleCheck } from '@tabler/icons';
import { useRouter } from 'next/router';

const scan = keyframes({
  'from, to': { top: '50%' },
  '30%, 33%': { top: '87%' },
  '70%, 73%': { top: '10%' },
  // '70%': { transform: 'translate3d(0, 15px, 0)' },
  // '90%': { transform: 'translate3d(0, 4px, 0)' },
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
}));

export function RFIdPreparation() {
  const [opened, setOpened] = useState(true);
  const [enableToScan, setEnableToScan] = useState<boolean>(false);
  const [successScan, setSuccessScan] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(3);
  const { classes } = modalScannerStyles();
  const router = useRouter();

  useEffect(() => {
    if (enableToScan) {
      const timeOut = setTimeout(() => {
        setEnableToScan(false);
        setSuccessScan(true);
      }, 10000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [enableToScan]);

  useEffect(() => {
    if (successScan && counter !== 0) {
      const interval = setInterval(() => {
        setCounter(prev => prev - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [successScan, counter]);

  useEffect(() => {
    if (counter === 0 && opened) {
      setOpened(false);
      router.push('/customers/now');
    }
  }, [counter, router, opened]);

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      overflow="inside"
    >
      <Stack align="center" my={45}>
        <Title order={3} transform="uppercase">
          {successScan ? 'Sukses' : 'Pindai kartu'}
        </Title>
        <Box>
          {successScan ? (
            <IconCircleCheck size={200} className={classes.iconSuccess} />
          ) : (
            <RFIDScanner enableToScan={enableToScan} />
          )}
        </Box>
        <Stack align="center" spacing="xl">
          <Stack align="center" spacing="xs" className={classes.scannerMessage}>
            {successScan ? (
              <>
                <Text weight="bold" transform="capitalize">
                  Selamat Kartu Siap Digunakan!!!
                </Text>
                <Text>Klik Tombol Lanjutkan Untuk mendaftarkan kartu</Text>
              </>
            ) : enableToScan ? (
              <>
                <Text weight="bold" transform="capitalize">
                  Memindai
                </Text>
                <Text>Dekatkan kartu anda ke RFID Scanner</Text>
              </>
            ) : (
              <>
                <Text weight="bold" transform="capitalize">
                  Siapkan Kartu Anda
                </Text>
                <Text>Pastikan kartu Anda Baru</Text>
              </>
            )}
          </Stack>

          {successScan ? (
            <Button
              onClick={() => {
                setEnableToScan(true);
              }}
              color="green"
            >
              Lanjutkan {counter !== 0 && counter}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setEnableToScan(true);
              }}
              loading={enableToScan}
            >
              {enableToScan ? 'Memindai' : 'Pindai Sekarang'}
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
