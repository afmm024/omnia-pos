import SupplierUseCase from "@/domain/interactors/suppliers/SuppliersUseCase";
import { useCartStore } from "@/domain/store/CartStore";
import { Supplier } from "@/domain/types/SupplierType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { ActionIcon, Drawer, Loader, Select, Tooltip, useDrawersStack } from "@mantine/core";
import {LucideUserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { KeyValue } from "@/domain/types/GeneralType";

interface Props {
}

export default function SupplierBox({ }: Props) {
    const supplierCase = container.get<SupplierUseCase>(UseCaseTypes.SupplierUseCase);
    const { setSupplier } = useCartStore((state) => state);
    const stack = useDrawersStack(['create', 'select']);
    const [value, setValue] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suppliers, setSuppliers] = useState<KeyValue[]>([])
    const [data, setData] = useState<Supplier[]>([])

    const loadSupplier = (terms: string) => {
        setIsLoading(true);
        supplierCase.searchSupplierByCriteria(terms).then((supplier) => {
            const response = supplier.data as Supplier[];
            const adaptResult = response.map(supplier => ({
                label: `${supplier.name} - ${supplier.document}`,
                value: supplier.id
            }));
            setSuppliers(adaptResult);
            setData(response);
            if (!value) {
                const defaultValue = response.find(supplier => supplier.name.includes('Consumidor'));
                setValue(defaultValue ? defaultValue.id : null)
            }
        }).catch((error) => {
            console.error('Error al buscar tercero:', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadSupplier('');
    }, [])


    useEffect(() => {
        if (value) {
            const supplierFind = data.find(supplier => supplier.id === value);
            if (supplierFind) {
                setSupplier(supplierFind);
            }
        }
    }, [value])


    return (
        <>
            <Drawer.Stack>
                <Drawer {...stack.register('select')} position="right" title="Seleccionar tercero">

                </Drawer>
                <Drawer {...stack.register('create')} position="right" title="Crear tercero">

                </Drawer>
            </Drawer.Stack>
            <Select
                mb={10}
                value={value}
                onChange={setValue}
                nothingFoundMessage={isLoading ? 'Buscando...' : 'No se encontraron resultados'}
                clearable
                leftSection={
                    !isLoading ? <>
                        <Tooltip label="Crear un tercero">
                            <ActionIcon variant="transparent" size="lg" aria-label="Create Supplier" onClick={() => stack.open('create')}>
                                <LucideUserPlus style={{ width: '70%', height: '70%' }} strokeWidth={1.5} />
                            </ActionIcon>
                        </Tooltip>
                    </> : <Loader color="primary" size={'sm'} />
                }
                searchable
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                data={suppliers}
            />

        </>
    )
}