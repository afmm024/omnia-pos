import CashierUseCase from "@/domain/interactors/cashiers/CashierUseCase";
import { Cashier } from "@/domain/types/CashierType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { Button, NumberInput, Stack } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { LucideCheck, LucideX } from "lucide-react";


interface Props {
    successCallback: () => void
    closeAction: () => void
}

export default function OpenCashier({ successCallback, closeAction }: Props) {
    const cashierCase = container.get<CashierUseCase>(UseCaseTypes.CashierUseCase);
    const form = useForm<any>({
        mode: 'uncontrolled',
        initialValues: {
            baseAmount: 0
        },
        validate: {
            
        },
    });
    const handleOpenCashier = (formValues: {baseAmount: number}) => {
        const idNotification = notifications.show({
            loading: true,
            title: 'Operación de caja',
            message: 'Apertura de caja',
            position: 'top-right',
            autoClose: false,
            withCloseButton: false,
        });
        cashierCase.openCashier(formValues.baseAmount).then(() => {
            notifications.update({
                id: idNotification,
                color: 'teal',
                title: 'Operación de caja',
                message: 'Apertura de caja exitosa',
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
                message: 'Error en la apertura de caja',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000
            });
        });
    }
    return (
        <form onSubmit={form.onSubmit(handleOpenCashier)}>
            <Stack gap={'md'}>
                <NumberInput
                    label="Valor de la Base"
                    placeholder="Ingrese valor de la base"
                    key={form.key('baseAmount')}
                    {...form.getInputProps('baseAmount')}
                />
                <Button disabled={!form.isValid()} type="submit">
                    Abrir caja
                </Button>
                <Button variant="outline" onClick={closeAction}>
                    Cancelar
                </Button>
            </Stack>
        </form>
    )
}