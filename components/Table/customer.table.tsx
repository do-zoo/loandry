import { ICustomer } from '@/types/res';
import {
  ICustomerLabel,
  generateCustomerLabel,
  localeSexToId,
} from '@/utils/index';
import { customerKeys } from '@/variables/index';
import { Box, Center, Text } from '@mantine/core';
import { useMemo } from 'react';
import BaseTable from './_base-table';

interface IProps {
  customers: ICustomer[];
}

export function CustomerTable({ customers }: IProps) {
  const tableHead = useMemo(() => {
    return customerKeys.reduce((acc, cur) => {
      const value = generateCustomerLabel(cur);
      if (value) {
        acc.push(value);
      }
      return acc;
    }, [] as ICustomerLabel[]);
  }, []);

  const renderBody =
    customers.length > 0 ? (
      <tbody>
        {customers.map((customer, i) => (
          <tr key={customer._id}>
            {tableHead.map((v, i) => {
              const value = customer[v.key];
              if (typeof value === 'string' && Date.parse(value)) {
                return (
                  <td key={i}>
                    {new Date(value).toLocaleString('id-ID', {
                      dateStyle: 'long',
                    })}
                  </td>
                );
              }
              if (value === 'female' || value === 'male') {
                return (
                  <td key={i}>
                    <Text transform="capitalize">{localeSexToId(value)}</Text>
                  </td>
                );
              }
              return <td key={i}>{value}</td>;
            })}
          </tr>
        ))}
      </tbody>
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
          Belum Ada Pelanggan
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
    );

  return (
    <BaseTable length={customers.length}>
      <thead>
        <tr>
          {tableHead.map((v, i) => (
            <th key={i}>{v.value}</th>
          ))}
        </tr>
      </thead>
      {renderBody}
    </BaseTable>
  );
}
