import { Box, Button, Modal, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';

export function RFIdPreparation() {
  const [opened, setOpened] = useState(true);
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
        <Box>Scanner Icon</Box>
        <Stack className="message" align="center">
          <Text weight="bold" transform="capitalize">
            Siapkan Kartu Anda
          </Text>
          <Text>Pastikan kartu Anda Baru</Text>
          <Button>Pindai Sekarang</Button>
        </Stack>
      </Stack>
      {/* Modal content */}
    </Modal>
  );
}
