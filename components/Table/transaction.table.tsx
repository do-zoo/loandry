import { ITransaction, TStatus } from '@/types/res';
import {
  ITransactionLabel,
  generateTransactionLabel,
  localeStatusToId,
} from '@/utils/index';
import { transactionKeys } from '@/variables/index';
import { Badge, Button, MantineColor, Menu } from '@mantine/core';
import { useMemo } from 'react';
import BaseTable from './_base-table';
import { IconEdit, IconSettings, IconTrash } from '@tabler/icons';

interface IProps {
  transactions: ITransaction[];
}

export function TransactionTable({ transactions }: IProps) {
  const tableHead = useMemo(() => {
    return transactionKeys.reduce((acc, cur) => {
      const value = generateTransactionLabel(cur);
      if (value) {
        acc.push(value);
      }
      return acc;
    }, [] as ITransactionLabel[]);
  }, []);

  function renderStatusColor(status: TStatus): MantineColor {
    switch (status) {
      case 'progress':
        return 'blue';
      case 'success':
        return 'green';
      case 'canceled':
        return 'red';

      default:
        return 'blue';
    }
  }

  const rows = transactions.map(transaction => (
    <tr key={transaction._id}>
      {tableHead.map((v, i) => {
        const value = transaction[v.key];
        if (value instanceof Date) {
          return (
            <td key={i}>
              {value.toLocaleString('id-ID', { dateStyle: 'full' })}
            </td>
          );
        }

        if (
          value === 'success' ||
          value === 'canceled' ||
          value === 'progress'
        ) {
          return (
            <td key={i}>
              <Badge color={renderStatusColor(value)}>
                {localeStatusToId(value)}
              </Badge>
            </td>
          );
        }
        return <td key={i}>{value}</td>;
      })}
      <td>
        <Menu shadow="md" width={150}>
          <Menu.Target>
            <Button size="xs">Aksi</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Aksi</Menu.Label>
            <Menu.Item icon={<IconEdit size={14} />}>Ubah</Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} />}>
              Hapus
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <BaseTable>
      <thead>
        <tr>
          {tableHead.map((v, i) => (
            <th key={i}>{v.value}</th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </BaseTable>
  );
}
