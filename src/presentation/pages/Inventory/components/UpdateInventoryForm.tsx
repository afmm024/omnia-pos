import { InventoryType } from "@/domain/enums/InventoryTypes.enum";
import InventoryUseCase from "@/domain/interactors/inventory/InventoryUseCase";
import { InventoryItem } from "@/domain/types/InventoryType"
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { Button, Group, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { LucideCheck, LucideX } from "lucide-react";

interface Props {
    item: InventoryItem,
    successCallback: () => void
    closeAction: () => void
}

export default function UpdateItemForm({ item, successCallback, closeAction }: Props) {

    const inventoryCase = container.get<InventoryUseCase>(UseCaseTypes.InventoryUseCase);

    const updateStock = (data: InventoryItem) => {
        const id = notifications.show({
            loading: true,
            title: 'Operación de inventario',
            message: 'Actualizando registro',
            autoClose: false,
            withCloseButton: false,
        });
        inventoryCase.updateStock(item.id, {
            Stock: data.stock,
            ReorderPoint: data.reorderPoint,
            SupplierId: "",
            Reference: "",
            Type: InventoryType.ADJUSTMENT
        }).then(() => {
            notifications.update({
                id,
                color: 'teal',
                title: 'Operación de inventario',
                message: 'Registro actualizado correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000,
            });
            successCallback();
        }).catch((error) => {
            console.error('Error al actualizar el registro:', error);
            notifications.update({
                id,
                color: 'red',
                title: 'Operación de inventario',
                message: 'Error actualizando el registro',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000,
            });

        })
    }

    const form = useForm<InventoryItem>({
        mode: 'uncontrolled',
        initialValues: {
            id: item.id,
            productId: item.productId,
            productName: item.productName,
            wareHouse: item.wareHouse,
            stock: item.stock,
            reorderPoint: item.reorderPoint,
            updatedAt: item.updatedAt,
            createdAt: item.createdAt
        },
        validate: {
            stock: (value) => (value < 0 ? 'Solo se permiten valores positivos' : null),
            reorderPoint: (value) => (value < 0 ? 'Solo se permiten valores positivos' : null),
        },
    });

    return (
        <>
            <form onSubmit={form.onSubmit(updateStock)}>
                <Stack gap={'md'}>
                    <TextInput
                        label="ID del producto"
                        placeholder="ID del producto"
                        disabled
                        key={form.key('productId')}
                        {...form.getInputProps('productId')}
                    />
                    <TextInput
                        label="Nombre del producto"
                        placeholder="Nombre del producto"
                        disabled
                        key={form.key('productName')}
                        {...form.getInputProps('productName')}
                    />
                    <TextInput
                        label="Bodega asignada"
                        placeholder="Bodega asignada"
                        disabled
                        key={form.key('wareHouse')}
                        {...form.getInputProps('wareHouse')}
                    />
                    <Group gap={'md'}>
                        <NumberInput
                            mt="sm"
                            label="Stock"
                            placeholder="Stock"
                            min={0}
                            key={form.key('stock')}
                            {...form.getInputProps('stock')}
                        />
                        <NumberInput
                            mt="sm"
                            label="Punto de quiebre"
                            placeholder="Punto de quiebre"
                            min={0}
                            key={form.key('reorderPoint')}
                            {...form.getInputProps('reorderPoint')}
                        />
                    </Group>
                    <Button type="submit">
                        Actualizar stock
                    </Button>
                    <Button variant="outline" onClick={closeAction}>
                        Cancelar
                    </Button>
                </Stack>
            </form>
        </>
    )
}