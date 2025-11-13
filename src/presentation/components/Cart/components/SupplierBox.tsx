import SupplierUseCase from "@/domain/interactors/suppliers/SuppliersUseCase";
import { useCartStore } from "@/domain/store/CartStore";
import { Supplier } from "@/domain/types/SupplierType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { ActionIcon, Drawer, Group, Loader, Select, Tooltip, useDrawersStack } from "@mantine/core";
import { LucideRefreshCcw, LucideUserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { KeyValue } from "@/domain/types/GeneralType";
import SupplierForm from "../../Forms/Supplier/SupplierForm";

interface Props {
}

export default function SupplierBox({ }: Props) {
    const supplierCase = container.get<SupplierUseCase>(UseCaseTypes.SupplierUseCase);
    const { setSupplier, supplier } = useCartStore((state) => state);
    const stack = useDrawersStack(['create']);
    const [value, setValue] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [suppliers, setSuppliers] = useState<KeyValue[]>([])
    const [data, setData] = useState<Supplier[]>([])

    const setDefaultValue = (suppliersData: KeyValue[], key: string) => {
        const filterSupplier = suppliersData.find((supplier) => supplier.label.includes(key))
        if (filterSupplier) {
            setValue(filterSupplier.value)
        }
    }

    const loadSupplier = (filter?: string) => {
        setIsLoading(true);
        supplierCase.getAllSuppliers().then((supplierResponse) => {
            const response = supplierResponse?.data as Supplier[];
            const adaptResult = response.map(supplier => ({
                label: `${supplier.name} | ${supplier.document}`,
                value: supplier.id
            }));
            setSuppliers(adaptResult);
            setData(response);
            if(filter){
                setDefaultValue(adaptResult, filter)
            }else{
                setDefaultValue(adaptResult, 'Consumidor Final')
            }
        }).catch((error) => {
            console.error('Error al buscar tercero:', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        loadSupplier();
    }, [])

    useEffect(() => {
        if (value) {
            const supplierFind = data.find(supplier => supplier.id === value);
            if (supplierFind) {
                setSupplier(supplierFind);
                setValue(supplierFind.id);
            }
        }else {
            setSupplier(null)
        }
    }, [value])


    return (
        <>
            <Drawer.Stack>
                <Drawer {...stack.register('create')} position="right" title="Crear tercero">
                    <SupplierForm onSucess={(data) => {
                        loadSupplier(data.name)
                        stack.closeAll()
                    }} />
                </Drawer>
            </Drawer.Stack>
            <Group gap={'md'} justify="space-between" mb={10}>
                <div style={{ flexGrow: 1 }}>
                    <Select
                        value={value}
                        onChange={setValue}
                        size="sm"
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
                        data={suppliers}
                    />
                </div>
                <ActionIcon variant="light" size={'input-sm'} aria-label="Refresh" onClick={() => loadSupplier()}>
                    <LucideRefreshCcw strokeWidth={1.5} />
                </ActionIcon>
            </Group>

        </>
    )
}