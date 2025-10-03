import { ActionIcon, Button, Flex } from "@mantine/core";
import { LucideRefreshCw } from "lucide-react";
import { MantineReactTable, MRT_ColumnDef, MRT_GlobalFilterTextInput, MRT_RowData, useMantineReactTable } from "mantine-react-table"
import { MRT_Localization_ES } from "mantine-react-table/locales/es/index.cjs"
import { ReactNode } from "react";
import { RowActions } from "./table.types";


interface Props<T extends MRT_RowData> {
    columns: MRT_ColumnDef<T>[],
    data: T[],
    isLoading: boolean,
    totalCount: number,
    onRefreshAction: () => void,
    fragmentMenuActions?: (props: RowActions<T>) => ReactNode
    onAddAction?: () => void
    labelAddAction?: string
}

export default function Table<T extends MRT_RowData>({ columns, data, isLoading, totalCount, onRefreshAction, fragmentMenuActions, onAddAction, labelAddAction}: Props<T>) {
    const table = useMantineReactTable({
        columns: columns,
        data: data,
        localization: MRT_Localization_ES,
        rowCount: totalCount,
        enablePinning: true,
        enableColumnResizing: true,
        state: {
            isLoading: isLoading,
            showGlobalFilter: true,
            density: 'xs',
            columnPinning: {
                left: ['mrt-row-actions'],
            },
        },
        mantinePaginationProps: {
            radius: 'xl',
            size: 'lg',
        },
        enableStickyHeader: true,
        enableStickyFooter: true,
        enableRowActions: fragmentMenuActions !== undefined,
        positionActionsColumn: 'first',
        renderRowActions: fragmentMenuActions,
        renderTopToolbar: ({ table }) => {
            return (
                <>
                    <Flex p="md" justify="space-between">
                        <Flex style={{ gap: '8px' }}>
                            <ActionIcon variant="light" size={'lg'} onClick={() => onRefreshAction()} color="primary">
                                <LucideRefreshCw size={18} strokeWidth={2} />
                            </ActionIcon>
                            {onAddAction && <Button onClick={onAddAction}>{labelAddAction}</Button>}
                        </Flex>
                        <Flex gap="xs">
                            <MRT_GlobalFilterTextInput w={300} table={table} />
                        </Flex>
                    </ Flex>
                </>
            )
        }
    })

    return <MantineReactTable table={table} />;
}