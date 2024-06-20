import { TableModel } from "@/entities/table";
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, ColumnDefBase, ColumnDef } from "@tanstack/react-table";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

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
import { DataTableProps, TableRowData } from "../model";

import IconSort from '~icons/tabler/arrows-sort';

import './styles.scss';

const getColumns = <T extends Record<string, unknown>>(
  data: T[],
  handleSorting?: (columnId: keyof T) => void
): ColumnDef<T>[] => {
  if (!data || data.length === 0) {
    return [];
  }

  const firstRow = data[0];
  return Object.keys(firstRow).map((key: string) => ({
    accessorKey: key,
    header: () => (
      <Button variant="link" className="px-0 text-black" onClick={() => handleSorting && handleSorting(key as keyof T)}>
        {key}
        <IconSort className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: (info: any) => {
      let value = info.getValue();
      if (typeof value === 'boolean') {
        value = value ? 'Да' : 'Нет';
      }
      else {
        value = value.toString() || '---';
      }

      return (
        (
          <div className="data-table__cell">{value}</div>
        )
      )
    },
    headerText: key,
  }));
};

const DataTable: React.FunctionComponent<DataTableProps> = observer(({ dfName }) => {
  const tableStore = TableModel.tableStore;

  const data = tableStore.tableData.data
  const meta = tableStore.tableData.meta
  const loading = tableStore.loading

  const fetchTable = async (page: number, pageSize: number, column?: string, sort?: 'asc' | 'desc') => {
    try {
      const params = { pg: page, n: pageSize, column, sort };
      await tableStore.getTable(dfName, params);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTable(tableStore.tableData.meta.pg || 0, tableStore.tableData.meta.n || 15);
  }, [dfName]);

  const handleSorting = (columnId: string) => {
    const currentSort = tableStore.sort;
    const newSort = currentSort.column === columnId && currentSort.sort === 'asc' ? 'desc' : 'asc';
    tableStore.setSort(columnId, newSort);
    fetchTable(meta.pg || 0, meta.n || 15, columnId, newSort);
  };

  const columns = getColumns(tableStore.tableData.data, handleSorting);

  const table = useReactTable<TableRowData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta.pages,
    rowCount: meta.rows,
    state: {
      pagination: {
        pageIndex: meta.pg || 0,
        pageSize: meta.n || 15,
      },
    }
  });

  const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
      const newPage = table.getState().pagination.pageIndex - 1;
      fetchTable(newPage, table.getState().pagination.pageSize);
    }
  };
  
  const handleNextPage = () => {
    if (table.getCanNextPage()) {
      const newPage = table.getState().pagination.pageIndex + 1;
      fetchTable(newPage, table.getState().pagination.pageSize);
    }
  };
  
  const handleLastPage = () => {
    if (table.getCanNextPage()) {
      const newPage = (meta.pages || 0) - 1;
      fetchTable(newPage, table.getState().pagination.pageSize);
    }
  };

  const handleFirstPage = () => {
    if (table.getCanPreviousPage()) {
      const newPage = 0;
      fetchTable(newPage, table.getState().pagination.pageSize);
    }
  };

  if (loading.item) {
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
                  <TableHead key={header.id} className="data-table__cell">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length && !loading.item ? (
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

export { DataTable, getColumns };
