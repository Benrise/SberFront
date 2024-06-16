import { TableModel } from "@/entities/table";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import IconLoadingCircle from '~icons/eos-icons/bubble-loading';

import { Button } from "@/shared/ui/button";
import { DataTableProps, getColumns, PaginationMeta, TableRowData } from "../model";

import './styles.scss';

const DataTable: React.FunctionComponent<DataTableProps> = observer(({ dfName }) => {
  const tableStore = TableModel.tableStore;

  const fetchTable = async (page: number, pageSize: number) => {
    try {
      const params = { pg: page, n: pageSize };
      await tableStore.getTable(dfName, params);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTable(tableStore.tableData.meta.pg || 0, tableStore.tableData.meta.n || 18);
  }, [dfName]);

  const columns = getColumns(tableStore.tableData.data);

  const table = useReactTable<TableRowData>({
    data: tableStore.tableData.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: tableStore.tableData.meta?.pages || 0,
    rowCount: tableStore.tableData.meta?.rows || 0,
  });

  const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
      const newPage = (tableStore.tableData.meta.pg || 0) - 1;
      fetchTable(newPage, (tableStore.tableData.meta.n || 18) as number);
    }
  };
  
  const handleNextPage = () => {
    if (table.getCanNextPage()) {
      const newPage = (tableStore.tableData.meta.pg || 0) + 1;
      fetchTable(newPage, (tableStore.tableData.meta.n || 18) as number);
    }
  };
  
  const handleLastPage = () => {
    if (table.getCanNextPage()) {
      const newPage = (tableStore.tableData.meta.pages || 0) - 1;
      fetchTable(newPage, (tableStore.tableData.meta.n || 18) as number);
    }
  };

  const handleFirstPage = () => {
    if (table.getCanPreviousPage()) {
      const newPage = 0;
      fetchTable(newPage, (tableStore.tableData.meta.n || 18) as number);
    }
  };

  if (tableStore.loading.item) {
    return (
      <div className="data-table__fallback">
        <IconLoadingCircle className="text-primary" width={48} height={48} />
      </div>
    );
  }

  return (
    <>
      <div className="data-table">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Данные отсутствуют
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="data-table__pagination pagination">
          <div className="pagination__left">
              <span>
                  cтр. {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}
              </span>
          </div>
          <div className="pagination__right">
              <Button
                  onClick={() => handleFirstPage()}
                  disabled={!table.getCanPreviousPage()}
                  size={'icon'}
                  variant={'secondary'}
              >
                  {'<<'}
              </Button>
              <Button
                  onClick={() => handlePreviousPage()}
                  disabled={!table.getCanPreviousPage()}
                  variant={'secondary'}
              >
                  Пред.
              </Button>
              <Button
                  onClick={() => handleNextPage()}
                  disabled={!table.getCanNextPage()}
                  variant={'secondary'}
              >
                  След.
              </Button>
              <Button
                  onClick={() => handleLastPage()}
                  disabled={!table.getCanNextPage()}
                  variant={'secondary'}
                  size={'icon'}
              >
                  {'>>'}
              </Button>
          </div>
        </div>
      </div>
    </>
  );
});

export { DataTable };
