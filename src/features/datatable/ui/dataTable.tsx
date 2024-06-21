import React from "react";
import { TableModel } from "@/entities/table";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
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
import { DataTableProps, TableRowData } from "../model";

import IconSort from '~icons/tabler/arrows-sort';

import './styles.scss';

import { useToast } from "@/shared/ui/use-toast";
import { TableStore } from "@/entities/table/model";

const EditableCell: React.FC<any> = React.memo(({ value, row, columnId, updateData, tableStore }) => {
  const [cellValue, setCellValue] = useState(value);

  const cellKey = `${row.index}-${columnId}`;
  const isLoading = tableStore.cellLoading[cellKey];

  const { toast } = useToast();

  const handleBlur = async () => {
    try {
      if (cellValue !== value) {
        let updatedValue: any = cellValue;

        if (typeof value === 'boolean') {
          updatedValue = cellValue === 'true';
        } else if (typeof value === 'number') {
          updatedValue = parseFloat(cellValue);
        }

        await updateData(row.index, columnId, updatedValue);
        toast({
          description: `Ячейка №${row.index + 1} для столбца: ${columnId} обновлена`,
        });
      }
    } catch (e) {
      toast({
        title: 'Произошла ошибка',
        description: 'Не удалось обновить ячейку',
        variant: 'destructive',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setCellValue(e.target.value);
  };

  const renderInput = () => {
    if (typeof value === 'boolean') {
      return (
        <select
          value={cellValue.toString()}
          onChange={handleChange}
          onBlur={handleBlur}
          className="data-table__input"
          disabled={isLoading}
        >
          <option value='true'>Да</option>
          <option value='false'>Нет</option>
        </select>
      );
    } else if (typeof value === 'number') {
      return (
        <input
          type="number"
          value={cellValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="data-table__input"
          disabled={isLoading}
        />
      );
    } else {
      return (
        <input
          type="text"
          value={cellValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className="data-table__input"
          disabled={isLoading}
        />
      );
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {isLoading && <IconLoadingCircle className="text-primary" />}
      {renderInput()}
    </div>
  );
});


const DataCell: React.FC<any> = ({ value }) => {
  let displayValue = value;
  if (typeof value === 'boolean') {
    displayValue = value ? 'Да' : 'Нет';
  } else {
    displayValue = value.toString() || '---';
  }

  return <div className="data-table__cell">{displayValue}</div>;
};

const getColumns = <T extends Record<string, unknown>>(
  data: T[],
  handleSorting?: (columnId: keyof T) => void,
  updateData?: (rowIndex: number, columnId: string, value: string) => void,
  isEditable: boolean = false,
  tableStore?: TableStore
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
    cell: ({ cell, row }) => (
      isEditable ? (
        <EditableCell
          value={cell.getValue()}
          row={row}
          columnId={key}
          updateData={updateData}
          tableStore={tableStore}
        />
      ) : (
        <DataCell
          value={cell.getValue()}
        />
      )
    ),
    headerText: key,
  }));
};

const DataTable: React.FunctionComponent<DataTableProps> = observer(({ dfName, editable }) => {
  const tableStore = TableModel.tableStore;

  const [_, setEditedCells] = useState<{ row: number | number[]; column: string; value: unknown }[]>([]);

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

  const updateData = async (rowIndex: number, columnId: string, value: string) => {
    await tableStore.updateCell(rowIndex, columnId, value);
    setEditedCells((prev) => {
      const existingCellIndex = prev.findIndex((cell) => cell.row === rowIndex && cell.column === columnId);
      if (existingCellIndex >= 0) {
        const updatedCells = [...prev];
        updatedCells[existingCellIndex].value = value;
        return updatedCells;
      } else {
        return [...prev, { row: [rowIndex], column: columnId, value }];
      }
    });
  };

  const columns = getColumns(tableStore.tableData.data, handleSorting, updateData, editable, tableStore);

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
    },
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
