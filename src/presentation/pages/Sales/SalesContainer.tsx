import { Box, LoadingOverlay, Stack, Badge, Menu, ActionIcon } from "@mantine/core";
import Table from "@/presentation/components/Table/Table";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo } from "react";
import { Cashier } from "@/domain/types/CashierType";
import { formatColombianMoney } from "@/presentation/helpers/priceUtils";
import { RowActions } from "@/presentation/components/Table/table.types";
import { LucideEdit, LucideFiles, LucideSettings } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    isLoading: boolean;
    cashiers: Cashier[];
    handleRefresh: () => void;
}
export default function SalesContainer({ isLoading, cashiers, handleRefresh }: Props) {

    const route = useRouter();

    const menuActions = (props: RowActions<Cashier>) => {
        const state = props.row.original.state;
        return (
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon variant="light" aria-label="Settings">
                        <LucideSettings style={{ width: '70%', height: '70%' }} strokeWidth={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<LucideFiles size={14} />} onClick={() => {
                        route.push(`/sales/${props.row.original.id}`)
                    }}>
                        Ver Facturas
                    </Menu.Item>
                </Menu.Dropdown>
            </ Menu>
        )
    }

    const columns = useMemo<MRT_ColumnDef<Cashier>[]>(
        () => [
            {
                accessorKey: 'userId',
                header: 'Empleado',
                enableColumnFilter: false,
            },
            {
                accessorKey: 'totalAmount',
                header: 'Total ventas',
                enableColumnFilter: false,
                Cell: ({ cell }) => formatColombianMoney(cell.getValue<number>())
            },
            {
                accessorKey: 'totalBills',
                header: 'Total facturas',
                enableColumnFilter: false,
            },
            {
                accessorKey: 'excessMoney',
                header: 'Total sobrante',
                enableColumnFilter: false,
                Cell: ({ cell }) => formatColombianMoney(cell.getValue<number>())
            },
            {
                accessorKey: 'cashAmount',
                header: 'Total efectivo',
                enableColumnFilter: false,
                Cell: ({ cell }) => formatColombianMoney(cell.getValue<number>())
            },
            {
                accessorKey: 'transfersAmount',
                header: 'Total transferencias',
                enableColumnFilter: false,
                Cell: ({ cell }) => formatColombianMoney(cell.getValue<number>())
            },
            {
                accessorKey: 'state',
                header: 'Estado',
                enableColumnFilter: false,
                Cell: ({ cell }) => cell.getValue<string>() === "open" ? <Badge color="green">Abierto</Badge> : <Badge color="red">Cerrado</Badge>
            },
            {
                accessorFn: (originalRow) => new Date(originalRow.openShiftDate),
                accessorKey: 'openShiftDate',
                header: 'Fecha de apertura',
                filterVariant: 'autocomplete',
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(),

            },
            {
                accessorFn: (originalRow) => new Date(originalRow.closeShiftDate),
                accessorKey: 'closeShiftDate',
                header: 'Fecha cierre',
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleString()
            },
        ], []);

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'primary', type: 'bars' }} />
                <Stack gap={'lg'}>
                    <Table<Cashier>
                        fragmentMenuActions={menuActions}
                        onRefreshAction={handleRefresh}
                        data={cashiers}
                        columns={columns}
                        isLoading={isLoading}
                        totalCount={cashiers.length} />
                </Stack>
            </Box>
        </>
    )
}