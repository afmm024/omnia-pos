import { MRT_Cell, MRT_Row, MRT_RowData, MRT_TableInstance } from "mantine-react-table";
import { ReactNode } from "react";

export type RowActions<T extends MRT_RowData> = {
    cell: MRT_Cell<T>,
    renderedRowIndex?: number,
    row: MRT_Row<T>,
    table: MRT_TableInstance<T>
}

export type RowDetail<T extends MRT_RowData> = {
    internalEditComponents: ReactNode[];
    row: MRT_Row<T>;
    table: MRT_TableInstance<T>;
}