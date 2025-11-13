import BillUseCase from "@/domain/interactors/bill/BillUseCase";
import { CashierBill } from "@/domain/types/CashierType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import Table from "@/presentation/components/Table/Table";
import { RowActions } from "@/presentation/components/Table/table.types";
import container from "@/presentation/config/inversify.config";
import { formatColombianMoney } from "@/presentation/helpers/priceUtils";
import { isNullOrEmpty } from "@/presentation/helpers/stringUtils";
import { ActionIcon, Badge, Box, Button, Group, LoadingOverlay, Menu, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { LucideArrowBigLeft, LucideCheck, LucideEllipsisVertical, LucideFiles, LucideFolderSync, LucideMail, LucideMessageCircle, LucidePrinter, LucideX } from "lucide-react";
import { MRT_ColumnDef } from "mantine-react-table";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {
    isLoading: boolean;
    bills: CashierBill[];
    handleRefresh: () => void;
}


export default function SalesContainer({isLoading,bills,handleRefresh }: Props) {

    const billCase = container.get<BillUseCase>(UseCaseTypes.BillUseCase);

    const handlerSyncBill = (id: string) => {
        const idNotification = notifications.show({
            loading: true,
            title: 'Operación de factura',
            message: 'Sincronizando factura con DIAN',
            position: 'top-right',
            autoClose: false,
            withCloseButton: false,
        });
        billCase.syncBill(id).then(() => {
            notifications.update({
                id: idNotification,
                color: 'teal',
                title: 'Operación de factura',
                message: 'Factura sincronizada correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000
            });
            handleRefresh();
        }).catch((error) => {
            console.log('Error al sincronizar la factura:', error)
            notifications.update({
                id: idNotification,
                color: 'red',
                title: 'Operación de factura',
                message: 'Error al sincronizar la factura',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000
            });
        });
    }

    const menuActions = (props: RowActions<CashierBill>) => {
        const electornicBill = props.row.original.billNumber;
        return (
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon variant="light" aria-label="Settings">
                        <LucideEllipsisVertical style={{ width: '70%', height: '70%' }} strokeWidth={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    {
                        !isNullOrEmpty(electornicBill) && <>
                            <Menu.Label>Opciones</Menu.Label>
                            <Menu.Item color="primary" leftSection={<LucidePrinter size={14} />} onClick={() => {

                            }}>
                                Imprimir factura
                            </Menu.Item>
                            <Menu.Item color="primary" leftSection={<LucideMail size={14} />} onClick={() => {

                            }}>
                                Enviar por email
                            </Menu.Item>
                            <Menu.Item disabled color="primary" leftSection={<LucideMessageCircle size={14} />} onClick={() => {

                            }}>
                                Enviar por whatsapp
                            </Menu.Item>
                        </>
                    }
                    {
                        isNullOrEmpty(electornicBill) && <>
                            <Menu.Label>Opciones DIAN</Menu.Label>
                            <Menu.Item color="green" leftSection={<LucideFolderSync size={14} />} onClick={() => {
                                handlerSyncBill(props.row.original.id)
                            }}>
                                Sincronizar factura
                            </Menu.Item>
                        </>

                    }
                </Menu.Dropdown>
            </ Menu>
        )
    }

    const columns = useMemo<MRT_ColumnDef<CashierBill>[]>(
        () => [
            {
                accessorKey: 'supplierId',
                header: 'Cliente',
                filterVariant: 'autocomplete',
                enableClickToCopy: true,
            },
            {
                accessorKey: 'total',
                header: 'Total factura',
                enableColumnFilter: false,
                Cell: ({ cell }) => formatColombianMoney(cell.getValue<number>())
            },
            {
                accessorKey: 'typePayment',
                header: 'Tipo de pago',
                enableColumnFilter: false,
            },
            {
                accessorKey: 'userId',
                header: 'Creado por',
                enableColumnFilter: false,
            },
            {
                accessorKey: 'billNumber',
                header: 'Estado',
                enableColumnFilter: false,
                Cell: ({ cell }) => !isNullOrEmpty(cell.getValue<string>()) ? <Badge color="green">Sincronizada</Badge> : <Badge color="red">No sincronizada</Badge>
            },
            {
                accessorKey: 'createdAt',
                header: 'Fecha de creación',
                enableColumnFilter: false
            },
        ], []);

    return (
        <>
            <Box pos="relative">
                <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'primary', type: 'bars' }} />
                <Stack gap={'lg'}>
                    <Table<CashierBill>
                        fragmentMenuActions={menuActions}
                        onRefreshAction={handleRefresh}
                        data={bills}
                        columns={columns}
                        isLoading={isLoading}
                        totalCount={bills.length} />
                </Stack>
            </Box>
        </>
    )
}