import { ICustomer, ITransaction } from "@/types/res";
import {
  ITransactionLabel,
  generateCustomerLabel,
  generateTransactionLabel,
  localeSexToId,
} from "@/utils/index";
import { transactionKeys } from "@/variables/index";
import { useMemo } from "react";
import BaseTable from "./_base-table";

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

  const rows = transactions.map((transaction, i) => (
    <tr key={transaction._id}>
      {tableHead.map((v, i) => {
        const value = transaction[v.key];
        if (value instanceof Date) {
          return (
            <td key={i}>
              {value.toLocaleString("id-ID", { dateStyle: "full" })}
            </td>
          );
        }
        if (value === "female" || value === "male") {
          return <td key={i}>{localeSexToId(value)}</td>;
        }
        return <td key={i}>{value}</td>;
      })}
    </tr>
  ));

  return (
    <BaseTable>
      <thead>
        <tr>
          {tableHead.map((v, i) => (
            <th key={i}>{v.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </BaseTable>
  );
}
