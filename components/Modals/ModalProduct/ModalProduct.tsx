import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ProductService } from '@/services/product.services';
import { setModalProduct } from '@/stores/features/modal/modal.slice';
import { toBase64 } from '@/utils/format';
import { ProductSchema } from '@/variables/schema';
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm, yupResolver } from '@mantine/form';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export function ModalProduct() {
  const [errorImage, setErrorImage] = useState<string>('');
  const queryClient = useQueryClient();
  const { visibility: isOpen, data } = useAppSelector(
    state => state.modals.modalProduct
  );

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: ProductService.createProduct,
    onSuccess() {
      queryClient.invalidateQueries(['products']);
    },
  });

  const { mutateAsync: updateAsync, isLoading: updateLoad } = useMutation({
    mutationFn: ProductService.updateProduct,
    onSuccess() {
      queryClient.invalidateQueries(['products']);
    },
  });

  const router = useRouter();

  const form = useForm({
    initialValues: {
      code: '',
      name: '',
      price: 0,
      unit: '',
      image: '',
    },
    validate: yupResolver(ProductSchema),
  });
  const theme = useMantineTheme();

  const dispatch = useAppDispatch();

  const imagePreview = form.values.image;

  useEffect(() => {
    if (data?.defaultValues) {
      return form.setValues({
        code: data?.defaultValues['code'],
        image: data?.defaultValues['image'],
        name: data?.defaultValues['name'],
        price: data?.defaultValues['price'],
        unit: data?.defaultValues['unit'],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.defaultValues]);

  const handleClose = () => {
    dispatch(
      setModalProduct({
        visibility: false,
        data: undefined,
      })
    );
    form.reset();
  };

  const onSubmit = form.onSubmit(values => {
    try {
      if (data?.type === 'update-product') {
        updateAsync({ id: data?.defaultValues['_id'], data: values });
      } else {
        mutateAsync(values);
      }
      handleClose();
      form.reset();
      router.replace(router.asPath);
    } catch (err) {
      console.log(err);
    }
  });

  const previews = (file: string) => {
    return (
      <Image
        src={file}
        alt="previews"
        fill
        style={{
          objectFit: 'cover',
        }}
      />
    );
  };

  return (
    <Modal
      centered
      opened={isOpen}
      onClose={handleClose}
      withCloseButton={false}
      overflow="inside"
      title={
        <Title order={3}>
          {' '}
          {data?.type === 'update-product'
            ? ' Ubah Produk'
            : ' Buat Produk Baru'}{' '}
        </Title>
      }
    >
      <form onSubmit={onSubmit}>
        <Stack align="stretch">
          <TextInput
            placeholder="Masukan Kode Produk"
            label="Kode Produk"
            withAsterisk
            {...form.getInputProps('code')}
          />
          <TextInput
            placeholder="Masukan Nama Produk"
            label="Nama Produk"
            withAsterisk
            {...form.getInputProps('name')}
          />
          <NumberInput
            hideControls
            placeholder="Masukan Harga Produk"
            label="Harga Produk"
            withAsterisk
            {...form.getInputProps('price')}
          />
          <Select
            placeholder="Unit"
            label="Unit"
            data={[
              { value: 'kg', label: 'Kg' },
              { value: 'pcs', label: 'Pcs' },
            ]}
            withAsterisk
            {...form.getInputProps('unit')}
          />

          <Dropzone
            onDrop={files => {
              toBase64(files[0])
                .then(base64Image => {
                  if (typeof base64Image === 'string') {
                    form.setFieldValue('image', base64Image);
                  }
                })
                .catch(error => {
                  console.log('error', error);
                });
            }}
            onReject={() => setErrorImage('Coba Ganti File')}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            pos="relative"
            // {...props}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: 'none' }}
              pos="relative"
            >
              {imagePreview && previews(imagePreview)}
              <Dropzone.Accept>
                <IconUpload
                  size={50}
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === 'dark' ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size={50}
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={50} stroke={1.5} />
              </Dropzone.Idle>
              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>

          <Button my="lg" type="submit" loading={isLoading || updateLoad}>
            Tambahkan
          </Button>
        </Stack>
      </form>
      {/* Modal content */}
    </Modal>
  );
}
