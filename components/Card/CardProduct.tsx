import { IProduct } from '@/types/res';
import { rupiah } from '@/utils/format';
import {
  ActionIcon,
  AspectRatio,
  Card,
  Group,
  Menu,
  Stack,
  Text,
} from '@mantine/core';
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons';
import Image from 'next/image';

interface IProps {
  product: IProduct;
  onDelete?: (id: string) => void;
  onUpdate?: (data: IProduct) => void;
}

export function CardProduct({ product, onDelete, onUpdate }: IProps) {
  return (
    <Card shadow="sm" p={0} pb="md" radius="md" withBorder>
      <Card.Section>
        <AspectRatio
          ratio={1}
          pos="relative"
          sx={{ maxWidth: '100%' }}
          mx="auto"
        >
          {Boolean(product.image) ? (
            <Image src={product.image} fill alt="Norway" />
          ) : (
            <Image
              src="/assets/png/placeholder-product.png"
              fill
              alt="Norway"
            />
          )}
        </AspectRatio>
      </Card.Section>
      <Stack pt="md" spacing="xs">
        <Group noWrap position="apart">
          <Text weight={500} pl="sm" transform="capitalize" lineClamp={2}>
            {product.name}
          </Text>
          <Menu shadow="md" width={150} position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconDotsVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {onUpdate && (
                <Menu.Item
                  icon={<IconEdit size={14} />}
                  onClick={() => {
                    onUpdate(product);
                  }}
                >
                  Ubah
                </Menu.Item>
              )}
              {onDelete && (
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={14} />}
                  onClick={() => {
                    onDelete(product._id);
                  }}
                >
                  Hapus
                </Menu.Item>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Text align="right" weight={600} size="lg" color="indigo" px="sm">
          {rupiah(product.price)}/{product.unit}
        </Text>
      </Stack>
    </Card>
  );
}
