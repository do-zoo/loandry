import { citiesOfIndonesia } from '@/variables/city-of-indonesia';
import {
  Button,
  Card,
  Container,
  Group,
  InputBase,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import 'dayjs/locale/id';

function AddCustomer() {
  const form = useForm({
    //   defaultValues:
  });

  return (
    <>
      <Head>
        <title>
          Tambah Pelanggan Baru | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
      </Head>
      <Container size="xs" w={'100%'} py="lg">
        <Stack align="stretch" spacing="xl">
          <Title order={3}>Tambahkan Pelanggan Baru</Title>
          <Stack>
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: 481, cols: 1, spacing: 'sm' }]}
            >
              <TextInput
                placeholder="Masukan Nama"
                label="Nama Lengkap"
                withAsterisk
              />

              <InputBase
                placeholder="Masukan NISN"
                label="NISN"
                withAsterisk
                // component={InputMask}
                // mask="9999999999"
              />
            </SimpleGrid>
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: 481, cols: 1, spacing: 'sm' }]}
            >
              <Select
                searchable
                nothingFound="Tempat Tidak Ditemukan"
                label="Tempat Lahir"
                placeholder="Tempat Lahir"
                withAsterisk
                data={citiesOfIndonesia}
              />
              <DatePicker
                placeholder="Pilih Tanggal"
                label="Tanggal Lahir"
                withAsterisk
                locale="id"
                inputFormat="D MMMM YYYY"
              />
            </SimpleGrid>
            <Radio.Group
              //   name="favoriteFramework"
              label="Jenis Kelamin"
              withAsterisk
            >
              <Radio value="male" label="Laki-Laki" />
              <Radio value="female" label="Perempuan" />
            </Radio.Group>
            <SimpleGrid
              cols={2}
              breakpoints={[{ maxWidth: 481, cols: 1, spacing: 'sm' }]}
            >
              <TextInput
                placeholder="Masukan Email"
                label="Email"
                withAsterisk
              />
              <InputBase
                placeholder="Masukan Nomor Telepon"
                label="Nomor Telepon"
                withAsterisk
                // component={InputMask}
                // mask={'+62 899-9999-9999'}
              />
            </SimpleGrid>
          </Stack>
          <Button>Tambahkan</Button>
        </Stack>
      </Container>
    </>
  );
}

export default AddCustomer;
