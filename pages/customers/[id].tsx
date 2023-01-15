import { CustomerService } from '@/services/customer.services';
import { RfIdService } from '@/services/rfid.services';
import { citiesOfIndonesia } from '@/variables/city-of-indonesia';
import { CreateCustomerSchema } from '@/variables/schema';
import {
  Button,
  Container,
  Radio,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, yupResolver } from '@mantine/form';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';

export const getServerSideProps: GetServerSideProps = async context => {
  const { id = '' } = context.query;
  const { data } = await RfIdService.getAvailableRfId();

  const { rfid } = data ?? {};

  if (rfid !== id) {
    return {
      redirect: {
        destination: '/customers?',
        permanent: false,
      },
    };
  }

  return {
    props: {
      id,
    }, // will be passed to the page component as props
  };
};

interface IAddCustomerProps {
  id: string;
}

const AddCustomer: NextPage<IAddCustomerProps> = props => {
  const { id } = props;

  const router = useRouter();

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: CustomerService.createCustomer,
  });

  const { mutate: handleDeleteRfId } = useMutation({
    mutationFn: RfIdService.resetAvailableRfId,
  });

  const form = useForm({
    initialValues: {
      name: '',
      place_of_birth: '',
      email: '',
      phone: '',
      birth_date: new Date(),
      sex: '',
      rfid: id,
    },
    validate: yupResolver(CreateCustomerSchema),
  });

  const onSubmit = form.onSubmit(values => {
    try {
      mutateAsync(values);
      handleDeleteRfId();
      router.push('/customers');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <Head>
        <title>
          Tambah Pelanggan Baru | {process.env.NEXT_PUBLIC_APP_NAME}
        </title>
      </Head>
      <Container size="xs" w={'100%'} py="lg">
        <form onSubmit={onSubmit}>
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
                  {...form.getInputProps('name')}
                />

                {/* <InputBase
                placeholder="Masukan NISN"
                label="NISN"
                withAsterisk
                // component={InputMask}
                // mask="9999999999"
              /> */}
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
                  {...form.getInputProps('place_of_birth')}
                />
                <DatePicker
                  placeholder="Pilih Tanggal"
                  label="Tanggal Lahir"
                  withAsterisk
                  locale="id"
                  inputFormat="D MMMM YYYY"
                  allowFreeInput
                  dateParser={dateString => new Date(Date.parse(dateString))}
                  minDate={dayjs(new Date())
                    .startOf('year')
                    .add(-65, 'year')
                    .toDate()}
                  maxDate={dayjs(new Date())
                    .endOf('year')
                    .subtract(10, 'years')
                    .toDate()}
                  {...form.getInputProps('birth_date')}
                />
              </SimpleGrid>
              <Radio.Group
                //   name="favoriteFramework"
                label="Jenis Kelamin"
                withAsterisk
                {...form.getInputProps('sex')}
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
                  {...form.getInputProps('email')}
                />
                <TextInput
                  placeholder="Masukan Nomor Telepon"
                  label="Nomor Telepon"
                  withAsterisk
                  {...form.getInputProps('phone')}
                  // component={InputMask}
                  // mask={'+62 899-9999-9999'}
                />
              </SimpleGrid>
            </Stack>
            <Button type="submit" loading={isLoading}>
              Tambahkan
            </Button>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default AddCustomer;
