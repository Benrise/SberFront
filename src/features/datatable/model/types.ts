import { DataframeNamesEnum } from "@/entities/table/model";

export type TableRowData = Record<string, string>;

export type DataTableProps = {
    dfName: DataframeNamesEnum;
    editable?: boolean;
    toolbar?: {
      title?: string;
      buttons?: React.ReactNode[];
    }
  };
  
 export type PaginationMeta = {
    n?: number;
    pg?: number;
    rows?: number;
    pages?: number;
  };