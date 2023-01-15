import { Center, Pagination, ScrollArea, Stack, Table } from '@mantine/core';
import React, { ReactNode } from 'react';

function BaseTable({
  children,
  length,
}: {
  children: ReactNode;
  length: number;
}) {
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
      {length > 0 && (
        <Center>
          <Pagination total={Math.ceil(length / 10)} />
        </Center>
      )}
    </Stack>
  );
}

export default BaseTable;
