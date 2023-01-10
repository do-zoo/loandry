import { Center, Pagination, ScrollArea, Stack, Table } from "@mantine/core";
import React, { ReactNode } from "react";

function BaseTable({ children }: { children: ReactNode }) {
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
          {children}
        </Table>
      </ScrollArea>
      <Center>
        <Pagination total={10} />
      </Center>
    </Stack>
  );
}

export default BaseTable;
