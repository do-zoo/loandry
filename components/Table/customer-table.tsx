import { ICustomer } from "@/types/res";
import {
  ICustomerLabel,
  generateCustomerLabel,
  localeSexToId,
} from "@/utils/index";
import { customerKeys } from "@/variables/index";
import { Center, Pagination, ScrollArea, Stack, Table } from "@mantine/core";
import { useMemo } from "react";

interface IProps {
  customers: ICustomer[];
}

function CustomerTable({ customers }: IProps) {
  const tableHead = useMemo(() => {
    return customerKeys.reduce((acc, cur) => {
      const value = generateCustomerLabel(cur);
      if (value) {
        acc.push(value);
      }
      return acc;
    }, [] as ICustomerLabel[]);
  }, []);

  const rows = customers.map((customer, i) => (
    <tr key={customer._id}>
      <td>{i + 1}</td>
      {tableHead.map((v, i) => {
        const value = customer[v.key];
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
    <Stack>
      <ScrollArea offsetScrollbars type="always">
        <Table
          striped
          withBorder
          horizontalSpacing="md"
          verticalSpacing="md"
          mb="sm"
        >
          <thead>
            <tr>
              <th>No</th>
              {tableHead.map((v, i) => (
                <th key={i}>{v.value}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Center>
        <Pagination total={10} />
      </Center>
    </Stack>
  );
}

export default CustomerTable;
