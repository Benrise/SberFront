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

import './styles.scss';
import { Button } from "@/shared/ui/button";
import { DataframeNamesEnum } from "@/entities/table/model";

type TableRowData = Record<string, string>;

type PaginationMeta = {
  n: number;
  pg: number;
  rows: number;
  pages: number;
};

const DataTable: React.FunctionComponent = observer(() => {
  const tableStore = TableModel.tableStore;

  const [data, setData] = useState<TableRowData[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ n: 18, pg: 0, rows: 0, pages: 0 });

  const fetchTable = async (page: number, pageSize: number) => {
    try {
      const params = { pg: page, n: pageSize };
      const response = await tableStore.getTable(DataframeNamesEnum.BILLS, params);

      if (response?.data) {
        setData(response.data);
        setMeta(response.meta);
        table.setPageIndex(page);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTable(meta.pg, meta.n);
  }, []);

  const getColumns = (data: TableRowData[]) => {
    if (data.length === 0) return [];
    const firstRow = data[0];
    return Object.keys(firstRow).map((key) => ({
      accessorKey: key,
      header: key,
    }));
  };

  const columns = getColumns(data);

  const table = useReactTable<TableRowData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta.pages,
    rowCount: meta.rows,
  });

  const handlePreviousPage = () => {
    if (table.getCanPreviousPage()) {
      const newPage = meta.pg - 1;
      fetchTable(newPage, meta.n);
    }
  };
  
  const handleNextPage = () => {
    if (table.getCanNextPage()) {
      const newPage = meta.pg + 1;
      fetchTable(newPage, meta.n);
    }
  };
  
  const handleLastPage = () => {
    if (table.getCanNextPage()) {
      const newPage = meta.pages - 1;
      fetchTable(newPage, meta.n);
    }
  };

  const handleFirstPage = () => {
    if (table.getCanPreviousPage()) {
      const newPage = 0;
      fetchTable(newPage, meta.n);
    }
  };

  return (
    <div className="data-table">
      {tableStore.loading.item ? (
        <div className="data-table__fallback">
          <IconLoadingCircle className="text-primary" width={48} height={48} />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
});

export { DataTable };
