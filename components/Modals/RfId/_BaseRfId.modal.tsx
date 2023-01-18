import { RfIdScanner } from '@/components/RfIdScanner';
import { KeyOfResponseStatus } from '@/variables/response-status';
import { Button, createStyles, Text, Title } from '@mantine/core';
import { IconCircleCheck, IconFaceIdError } from '@tabler/icons';

interface ModalTitleProps {
  status: KeyOfResponseStatus;
}

export const ModalTitle = ({ status }: ModalTitleProps) => {
  if (status === 'success') {
    return (
      <Title order={3} transform="uppercase">
        Sukses
      </Title>
    );
  }

  if (status === 'error' || status === 'card-used' || status === 'new-card') {
    return (
      <Title order={3} transform="uppercase">
        Error
      </Title>
    );
  }

  if (status === 'scanning') {
    return (
      <Title order={3} transform="uppercase">
        Memindai kartu
      </Title>
    );
  }

  return (
    <Title order={3} transform="uppercase">
      Pindai kartu
    </Title>
  );
};

interface ModalButtonProps {
  status: KeyOfResponseStatus;
  handleSuccess: () => void;
  onClick: () => void;
}

export const ModalButton = ({
  status,
  handleSuccess,
  onClick,
}: ModalButtonProps) => {
  if (status === 'success') {
    return (
      <Button color="green" onClick={handleSuccess}>
        Lanjutkan
      </Button>
    );
  }

  const handleClick = () => {
    console.log('');
    onClick();
    //   handleDeleteRfId(undefined, {
    //     onSuccess: () => {
    //       refetchAvailableToRegister();
    //       setStatus(true);
    //     },
    //   });
  };

  if (status === 'scanning') {
    return (
      <Button onClick={handleClick} loading>
        Memindai
      </Button>
    );
  }

  if (status === 'error' || status === 'card-used' || status === 'new-card') {
    return <Button onClick={handleClick}>Coba Lagi</Button>;
  }

  return <Button onClick={handleClick}>Pindai Sekarang</Button>;
};

interface ModalIllustrationProps {
  status: KeyOfResponseStatus;
}

const modalIllustrationStyles = createStyles((theme, _params, getRef) => ({
  iconSuccess: {
    color: theme.colors.green[5],
  },
  iconError: {
    color: theme.colors.red[5],
  },
}));

export const ModalIllustration = (props: ModalIllustrationProps) => {
  const { status } = props;
  const { classes } = modalIllustrationStyles();

  console.log(status);
  if (status === 'loading') {
    return <RfIdScanner enableToScan />;
  }

  if (status === 'success') {
    return <IconCircleCheck size={200} className={classes.iconSuccess} />;
  }

  if (status === 'error' || status === 'card-used' || status === 'new-card') {
    return <IconFaceIdError size={200} className={classes.iconError} />;
  }
  return <RfIdScanner enableToScan={false} />;
};

interface MessageProps {
  status: KeyOfResponseStatus;
}

export function RfIdScannerMessage({ status }: MessageProps) {
  if (status === 'success') {
    return (
      //  success message
      <>
        <Text weight="bold" transform="capitalize">
          Selamat Kartu Siap Digunakan!!!
        </Text>
        <Text>Klik Tombol Lanjutkan Untuk mendaftarkan kartu</Text>
      </>
    );
  }

  if (status === 'new-card') {
    return (
      //  available data message
      <>
        <Text weight="bold" transform="capitalize">
          Kartu Anda belum Terdaftar
        </Text>
        <Text>Daftarkan Kartu anda untuk melakukan transaksi</Text>
      </>
    );
  }

  if (status === 'card-used') {
    return (
      //  available data message
      <>
        <Text weight="bold" transform="capitalize">
          Kartu Anda Sudah Digunakan
        </Text>
        <Text>Pastikan Kartu anda baru</Text>
      </>
    );
  }

  if (status === 'error') {
    return (
      //  error scanner message
      <>
        <Text weight="bold" transform="capitalize">
          Ups Terjadi Kesalahan
        </Text>
        <Text>
          Pastikan Anda mendekatkan kartu ke RFID Scanner dan Terhubung dengan
          Internet
        </Text>
      </>
    );
  }

  if (status === 'loading') {
    return (
      //  loading
      <>
        <Text weight="bold" transform="capitalize">
          Memindai
        </Text>
        <Text>Dekatkan kartu anda ke RFID Scanner</Text>
      </>
    );
  }

  return (
    // idle message
    <>
      <Text weight="bold" transform="capitalize">
        Siapkan Kartu Anda
      </Text>
      <Text>Pastikan kartu Anda Baru</Text>
    </>
  );
}

export default RfIdScannerMessage;
