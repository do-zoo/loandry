import { ITransaction, TStatus } from '@/types/res';
import {
  ITransactionLabel,
  generateTransactionLabel,
  localeStatusToId,
} from '@/utils/index';
import { transactionKeys } from '@/variables/index';
import { Badge, Button, Center, MantineColor, Menu } from '@mantine/core';
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
        if (typeof value === 'string' && Date.parse(value)) {
          return (
            <td key={i}>
              {new Date(value).toLocaleString('id-ID', {
                dateStyle: 'long',
              })}
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

        // rupiah(product.price)

        return <td key={i}>{value}</td>;
      })}
    </tr>
  ));

  return (
    <BaseTable length={transactions.length}>
      <thead>
        <tr>
          {tableHead.map((v, i) => (
            <th key={i}>{v.value}</th>
          ))}
        </tr>
      </thead>
      {transactions.length > 0 ? (
        <tbody>{rows}</tbody>
      ) : (
        <tbody
          style={{
            position: 'relative',
          }}
        >
          <Center
            w={'100%'}
            py="lg"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          >
            Belum Ada Transaksi
          </Center>
          <tr
          // style={{
          //   padding: '50px 0',
          //   backgroundColor: 'none',
          // }}
          >
            <td
              style={{
                padding: '50px 0',
                backgroundColor: '#fff',
              }}
            ></td>
          </tr>
        </tbody>
      )}
    </BaseTable>
  );
}
