"use client"
import { InventoryItem } from "@/domain/types/InventoryType";
import StatsRing from "@/presentation/components/StatsRing/StatsRing";
import Table from "@/presentation/components/Table/Table";
import { ActionIcon, Box, Drawer, LoadingOverlay, Menu, SimpleGrid, Stack, Text } from "@mantine/core";
import { LucideCircleAlert, LucideCircleX, LucideEdit, LucideSettings } from "lucide-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useEffect, useMemo, useState } from "react";
import { incrementRuleReorder } from "./utils/rules";
import { calculateStats } from "./utils/calculateStats";
import { RowActions } from "@/presentation/components/Table/table.types";
import { useDisclosure } from "@mantine/hooks";
import UpdateItemForm from "./components/UpdateInventoryForm";

interface Props {
    isLoading: boolean;
    products: InventoryItem[];
    handleRefresh: () => void;
}


export default function InventoryContainer({ isLoading, products, handleRefresh }: Props) {

    const [stats, setStats] = useState({ outStock: 0, reorderStock: 0 })
    const [opened, { open, close }] = useDisclosure(false);
    const [updateItem, setUpdateItem] = useState<InventoryItem>()
    const columns = useMemo<MRT_ColumnDef<InventoryItem>[]>(
        () => [
            {
                accessorKey: 'productName',
                header: 'Producto',
                filterVariant: 'autocomplete',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'wareHouse',
                header: 'Bodega',
                filterVariant: 'autocomplete'
            },
            {
                accessorKey: 'stock',
                header: 'Stock',
                Cell: ({ cell }) => {
                    const stock = cell.getValue<number>();
                    const reorderPoint = cell.row.original.reorderPoint;
                    let color: string;

                    switch (true) {
                        case stock === 0:
                            color = 'red'
                            break;
                        case stock <= (reorderPoint + incrementRuleReorder):
                            color = 'orange'
                            break;
                        default:
                            color = 'var(--mantine-primary-color-light-color)'
                            break;
                    }
                    return (
                        <Box
                            style={{
                                backgroundColor: color,
                                padding: 10,
                                borderRadius: 20,
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            <Text size="sm" fw={700}>
                                {stock}
                            </Text>
                        </Box>
                    );
                },

            },
            {
                accessorKey: 'reorderPoint',
                header: 'Punto de quiebre',
                filterVariant: 'autocomplete'
            },
            {
                accessorFn: (originalRow) => new Date(originalRow.updatedAt),
                accessorKey: 'updatedAt',
                header: 'Fecha actualización',
                filterVariant: 'autocomplete',
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(),

            },
            {
                accessorFn: (originalRow) => new Date(originalRow.createdAt),
                accessorKey: 'createdAt',
                header: 'Fecha creación',
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleString()
            },
        ], []);

    const menuActions = (props: RowActions<InventoryItem>) => {
        return (
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon variant="light" aria-label="Settings">
                        <LucideSettings style={{ width: '70%', height: '70%' }} strokeWidth={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<LucideEdit size={14} />} onClick={() => {
                        console.log(props.row.original)
                        setUpdateItem(props.row.original);
                        open();
                    }}>
                        Editar stock
                    </Menu.Item>
                </Menu.Dropdown>
            </ Menu>
        )
    }

    useEffect(() => {
        setStats(calculateStats(products))
    }, [products])

    return (
        <>
            <Drawer closeOnClickOutside={false} opened={opened} onClose={close} position="right" title="Edicion de stock">
                {updateItem && <UpdateItemForm successCallback={() => {
                    handleRefresh();
                    close();
                }} closeAction={close} item={updateItem} />}
            </Drawer>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'primary', type: 'bars' }} />
                <Stack gap={'lg'}>
                    <SimpleGrid cols={{ base: 1, sm: 3 }}>
                        <StatsRing color="orange" icon={LucideCircleAlert} label="Proximos a vencer" stats={stats.reorderStock.toString()} progress={10} />
                        <StatsRing color="red" icon={LucideCircleX} label="Productos agotados" stats={stats.outStock.toString()} progress={10} />
                    </SimpleGrid>
                    <Table<InventoryItem>
                        fragmentMenuActions={menuActions}
                        onRefreshAction={handleRefresh}
                        data={products}
                        columns={columns}
                        isLoading={isLoading}
                        totalCount={products.length} />
                </Stack>
            </Box>
        </>
    )

}