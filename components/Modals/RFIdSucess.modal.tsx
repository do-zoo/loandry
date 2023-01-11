import { Box, Modal, Stack, Text, Title } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons';
import { useState } from 'react';

export function RFIdSuccess() {
  const [opened, setOpened] = useState(true);
  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      overflow="inside"
    >
      <Stack align="center" my={45} spacing="lg">
        <Title order={3} transform="uppercase">
          Berhasil!!!
        </Title>
        <IconCircleCheck size={200} color="green" />
        <Box>
          <Text transform="capitalize" weight="bold" align="center">
            kartu anda siap di daftarkan
          </Text>
          <Text align="center">
            Tunggu... anda akan diarak=hkan ke halaman pendaftaran
          </Text>
        </Box>
      </Stack>
      {/* Modal content */}
    </Modal>
  );
}
