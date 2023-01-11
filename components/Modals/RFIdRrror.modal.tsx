import {
  ActionIcon,
  Box,
  Button,
  Center,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconFaceIdError, IconX } from '@tabler/icons';
import React, { useState } from 'react';

export function RFIdError() {
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
          gagal!!
        </Title>
        <IconFaceIdError size={200} color="red" />
        <Box>
          <Text transform="capitalize" weight="bold" align="center">
            Kartu Sudah Digunakan
          </Text>
          <Text align="center">Pastikan kartu Anda Baru</Text>
        </Box>
        <ActionIcon
          variant="outline"
          radius="xl"
          size="lg"
          color="red"
          onClick={() => setOpened(false)}
        >
          <IconX size={32} />
        </ActionIcon>
      </Stack>
      {/* Modal content */}
    </Modal>
  );
}
