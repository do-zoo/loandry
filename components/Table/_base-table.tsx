import { Center, Pagination, ScrollArea, Stack, Table } from '@mantine/core';
import { ReactNode } from 'react';

function BaseTable({
  children,
  length,
  onPageChange,
}: {
  children: ReactNode;
  length: number;
  onPageChange: (e: number) => void;
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
          <Pagination
            total={Math.ceil(length / 10)}
            onChange={e => onPageChange(e)}
          />
        </Center>
      )}
    </Stack>
  );
}

export default BaseTable;
