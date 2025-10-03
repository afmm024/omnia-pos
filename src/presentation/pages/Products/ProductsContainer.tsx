"use client"
import { Product } from "@/domain/types/ProductType";
import Table from "@/presentation/components/Table/Table";
import { RowActions } from "@/presentation/components/Table/table.types";
import { ActionIcon, Badge, Box, Drawer, LoadingOverlay, Menu, Stack, useDrawersStack } from "@mantine/core";
import { LucideEdit, LucidePower, LucidePowerOff, LucideSettings } from "lucide-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import UpdateProductForm from "./components/UpdateProductForm";
import AddProductForm from "./components/AddProductForm";

interface Props {
    isLoading: boolean;
    products: Product[];
    handleRefresh: () => void;
    handleUpdate: (item: Product) => void;
}


export default function ProductsContainer({ isLoading, products, handleRefresh, handleUpdate }: Props) {

    const [updateItem, setUpdateItem] = useState<Product>()
    const stack = useDrawersStack(['create', 'edit']);

    const columns = useMemo<MRT_ColumnDef<Product>[]>(
        () => [
            {
                accessorKey: 'productId',
                header: 'ID',
                filterVariant: 'autocomplete',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'name',
                header: 'Producto',
                filterVariant: 'autocomplete',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'price',
                header: 'Precio',
                filterVariant: 'autocomplete',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'type',
                header: 'Tipo',
                filterVariant: 'autocomplete'
            },
            {
                accessorKey: 'state',
                header: 'Estado',
                filterVariant: 'autocomplete',
                Cell: ({ cell }) => cell.getValue<boolean>() ? <Badge color="green">Activo</Badge> : <Badge color="red">Inactivo</Badge>,
            },
            {
                accessorFn: (originalRow) => originalRow.updatedAt && new Date(originalRow.updatedAt),
                accessorKey: 'updatedAt',
                header: 'Fecha actualización',
                filterVariant: 'autocomplete',
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleString(),

            },
            {
                accessorFn: (originalRow) => originalRow.createdAt && new Date(originalRow.createdAt),
                accessorKey: 'createdAt',
                header: 'Fecha creación',
                Cell: ({ cell }) => cell.getValue<Date>().toLocaleString()
            },
        ], []);

    const menuActions = (props: RowActions<Product>) => {
        const state = props.row.original.state;
        return (
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon variant="light" aria-label="Settings">
                        <LucideSettings style={{ width: '70%', height: '70%' }} strokeWidth={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<LucideEdit size={14} />} onClick={() => {
                        setUpdateItem(props.row.original);
                        stack.open('edit');
                    }}>
                        Editar producto
                    </Menu.Item>
                    <Menu.Item color={state ? 'red' : 'green'} leftSection={state ? <LucidePowerOff size={14} /> : <LucidePower size={14} />} onClick={() => {
                        const payload = { ...props.row.original };
                        payload.state = !payload.state;
                        handleUpdate(payload);
                    }}>
                        {state ? 'Desactivar producto' : 'Activar producto'}
                    </Menu.Item>
                </Menu.Dropdown>
            </ Menu>
        )
    }

    return (
        <>
            <Drawer.Stack>
                <Drawer position="left" {...stack.register('create')} title="Crear producto">
                    <AddProductForm closeAction={() => stack.close('create')} successCallback={() => {
                        handleRefresh();
                        stack.close('create');
                    }} />
                </Drawer>
                <Drawer position="right" closeOnClickOutside={false} {...stack.register('edit')} title="Actualizar producto">
                    {updateItem && <UpdateProductForm closeAction={() => stack.close('edit')} successCallback={() => {
                        handleRefresh();
                        stack.close('edit');
                    }} item={updateItem} />}
                </Drawer>
            </Drawer.Stack>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'primary', type: 'bars' }} />
                <Stack gap={'lg'}>
                    <Table<Product>
                        fragmentMenuActions={menuActions}
                        onRefreshAction={handleRefresh}
                        onAddAction={() => stack.open('create')}
                        labelAddAction="Crear producto"
                        data={products}
                        columns={columns}
                        isLoading={isLoading}
                        totalCount={products.length} />
                </Stack>
            </Box>
        </>
    )

}