import { Box, createStyles, keyframes } from '@mantine/core';
import ScannerIllustration from '@/assets/svg/scanner.svg';

interface IPropRfIdScanner {
  enableToScan?: boolean;
}

const scan = keyframes({
  'from, to': { top: '50%' },
  '30%, 33%': { top: '87%' },
  '70%, 73%': { top: '10%' },
});

export function RfIdScanner({ enableToScan }: IPropRfIdScanner) {
  const { classes } = scannerStyles();

  return (
    <Box className={classes.wrapper}>
      <ScannerIllustration className={classes.baseScanner} />
      {enableToScan && <div className={classes.horizontalLine} />}
    </Box>
  );
}

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
