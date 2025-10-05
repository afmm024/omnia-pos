import CashierUseCase from "@/domain/interactors/cashiers/CashierUseCase";
import { Cashier } from "@/domain/types/CashierType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { Button, Group, NumberInput, Stack, Textarea } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { LucideCheck, LucideX } from "lucide-react";

interface Props {
    successCallback: () => void
    closeAction: () => void
    cashier: Cashier
}

export default function CloseCashier({ successCallback, closeAction, cashier }: Props) {
    const cashierCase = container.get<CashierUseCase>(UseCaseTypes.CashierUseCase);
    const form = useForm<Cashier>({
        mode: 'uncontrolled',
        initialValues: {
            baseAmount: cashier.baseAmount,
            cashAmount: cashier.cashAmount,
            transfersAmount: cashier.transfersAmount,
            excessMoney: 0,
            observations: "",
            closeShiftDate: cashier.closeShiftDate,
            openShiftDate: cashier.openShiftDate,
            createdAt: cashier.createdAt,
            id: cashier.id,
            state: cashier.state,
            updatedAt: cashier.updatedAt,
            userId: cashier.userId,
            totalAmount: cashier.totalAmount,
            totalBills: cashier.totalBills,
        },
        validate: {
            excessMoney: isNotEmpty('Campo requerido'),
        },
    });

    const handleCloseCashier = (formValues: Cashier) => {
        const idNotification = notifications.show({
            loading: true,
            title: 'Operación de caja',
            message: 'Cerrando operación de caja',
            position: 'top-right',
            autoClose: false,
            withCloseButton: false,
        });
        cashierCase.closeCashier(formValues.id, formValues.observations, formValues.excessMoney).then(() => {
            notifications.update({
                id: idNotification,
                color: 'teal',
                title: 'Operación de caja',
                message: 'Caja cerrada correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000
            });
            successCallback();
        }).catch((error) => {
            console.log('Error al cerrar caja:', error)
            notifications.update({
                id: idNotification,
                color: 'red',
                title: 'Operación de caja',
                message: 'Error al cerra la caja',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000
            });
        });
    }

    return (
        <form onSubmit={form.onSubmit(handleCloseCashier)}>
            <Stack gap={'md'}>
                <NumberInput
                    label="Valor de la Base"
                    disabled
                    key={form.key('baseAmount')}
                    {...form.getInputProps('baseAmount')}
                />
                <NumberInput
                    label="Total ventas en efectivo"
                    disabled
                    key={form.key('cashAmount')}
                    {...form.getInputProps('cashAmount')}
                />
                <NumberInput
                    label="Total ventas en transferencias"
                    disabled
                    key={form.key('transfersAmount')}
                    {...form.getInputProps('transfersAmount')}
                />
                <Group gap={'sm'} m={'auto'}>
                    <NumberInput
                        w={180}
                        label="Total en ventas"
                        disabled
                        key={form.key('totalAmount')}
                        {...form.getInputProps('totalAmount')}
                    />
                    <NumberInput
                        w={180}
                        label="Número de ventas"
                        disabled
                        key={form.key('totalBills')}
                        {...form.getInputProps('totalBills')}
                    />
                </Group>
                <NumberInput
                    label="Valor de sobrantes"
                    placeholder="Ingrese valor de sobrante"
                    key={form.key('excessMoney')}
                    {...form.getInputProps('excessMoney')}
                />
                <Textarea
                    label="Observaciones"
                    size="md"
                    radius="md"
                    placeholder="Ingresa aquí las novedades del turno"
                    key={form.key('observations')}
                    {...form.getInputProps('observations')}
                />
                <Button disabled={!form.isValid()} type="submit">
                    Cerrar caja
                </Button>
                <Button variant="outline" onClick={closeAction}>
                    Cancelar
                </Button>
            </Stack>
        </form>
    )
}
