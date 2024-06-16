import { TableRowData } from ".";

export const getColumns = (data: TableRowData[]) => {
    if (data.length === 0) return [];
    const firstRow = data[0];
    return Object.keys(firstRow).map((key) => ({
      accessorKey: key,
      header: key,
    }));
  };
