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
  },
}));

export function RFIdPreparation() {
  const [opened, setOpened] = useState(true);
  const [enableToScan, setEnableToScan] = useState<boolean>(false);
  const { classes } = modalScannerStyles();

  useEffect(() => {
    if (enableToScan) {
      const timeOut = setTimeout(() => {
        setEnableToScan(false);
      }, 10000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [enableToScan]);

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
          Pindai kartu
        </Title>
        <Box>
          <RFIDScanner enableToScan={enableToScan} />
        </Box>
        <Stack align="center" spacing="xl">
          <Stack align="center" spacing="xs" className={classes.scannerMessage}>
            {enableToScan ? (
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

          <Button
            onClick={() => {
              setEnableToScan(true);
            }}
            loading={enableToScan}
          >
            {enableToScan ? 'Memindai' : 'Pindai Sekarang'}
          </Button>
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
