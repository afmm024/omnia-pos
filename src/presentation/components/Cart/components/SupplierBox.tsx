import SupplierUseCase from "@/domain/interactors/suppliers/SuppliersUseCase";
import { Supplier } from "@/domain/types/SupplierType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { ActionIcon, Box, Drawer, Group, Skeleton, Text, Tooltip, useDrawersStack } from "@mantine/core";
import { LucideFileText, LucideUserPlus } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
    onSelectSupplier: (supplier: Supplier) => void;
}

export default function SupplierBox({onSelectSupplier}: Props) {
    const supplierCase = container.get<SupplierUseCase>(UseCaseTypes.SupplierUseCase);
    const stack = useDrawersStack(['create', 'select']);
    const [supplier, setSupplier] = useState<Supplier>();

    const loadSuplierDefault = () => {
        supplierCase.searchSupplierByCriteria('Consumidor final').then((supplier) => {
            if(Array.isArray(supplier.data)){
                setSupplier(supplier.data[0]);
            }else {
                setSupplier(supplier.data);
            }
        }).catch((error) => {
            console.error('Error al buscar tercero:', error);
        })
    }

    useEffect(() => {
        loadSuplierDefault();
    }, [])

    useEffect(() => {
        if(supplier){
            onSelectSupplier(supplier);
        }
    },[supplier])


    return (
        <>
            <Drawer.Stack>
                <Drawer {...stack.register('select')} position="right" title="Seleccionar tercero">

                </Drawer>
                <Drawer {...stack.register('create')} position="right" title="Crear tercero">

                </Drawer>
            </Drawer.Stack>
            <Group justify="space-between" mb="sm" align="center" style={{ width: '100%', }}>
                <Tooltip label="Seleccionar un tercero">
                    <ActionIcon variant="transparent" size="lg" aria-label="Select supplier" onClick={() => stack.open('select')}>
                        <LucideFileText style={{ width: '70%', height: '70%' }} strokeWidth={1.5} />
                    </ActionIcon>
                </Tooltip>
                <Box ta="center">
                    {supplier ? <Text size="lg" style={{ fontWeight: 600 }}>
                        {supplier.name}
                    </Text> : <Skeleton height={20} width={200}/>}
                    { supplier ? <Text size="sm" c="dimmed">
                        Documento: {supplier.document}
                    </Text> : <Skeleton mt={5} height={10} width={200}/>}
                </Box>
                <Tooltip label="Crear un tercero">
                    <ActionIcon variant="transparent" size="lg" aria-label="Create Supplier" onClick={() => stack.open('create')}>
                        <LucideUserPlus style={{ width: '70%', height: '70%' }} strokeWidth={1.5} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </>
    )
}