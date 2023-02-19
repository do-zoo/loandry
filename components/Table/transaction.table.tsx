import { ITransaction, TStatus } from '@/types/res';
import { rupiah } from '@/utils/format';
import {
  generateTransactionLabel,
  ITransactionLabel,
  localeStatusToId,
} from '@/utils/index';
import { transactionKeys } from '@/variables/index';
import { Badge, Center, MantineColor } from '@mantine/core';
import { useMemo, useState } from 'react';
import BaseTable from './_base-table';

interface IProps {
  transactions: ITransaction[];
}

export function TransactionTable({ transactions }: IProps) {
  const [page, setPage] = useState(1);

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
  const tableBody = useMemo(() => {
    if (page === 1) {
      return transactions;
    } else {
      return transactions.slice(Math.floor((page - 1) * 9));
    }
  }, [transactions, page]);

  const rows = tableBody.map(transaction => (
    <tr key={transaction._id}>
      {tableHead.map((v, i) => {
        const value = transaction[v.key];
        if (
          (v.key === 'createdAt' || v.key === 'due_date') &&
          Date.parse(transaction[v.key])
        ) {
          return (
            <td key={i}>
              {new Date(transaction[v.key]).toLocaleString('id-ID', {
                dateStyle: 'long',
              })}
            </td>
          );
        }
        if (v.key === 'product_price' || v.key === 'total_amount') {
          return <td key={i}>{rupiah(transaction[v.key])}</td>;
        }

        if (v.key === 'quantity') {
          return (
            <td key={i}>
              {transaction[v.key]} {transaction['product_unit']}
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

        return <td key={i}>{transaction[v.key]}</td>;
      })}
    </tr>
  ));

  const onPageChange = (e: number) => {
    setPage(e);
  };

  return (
    <BaseTable length={transactions.length} onPageChange={onPageChange}>
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
          <tr>
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
