import container from "@/presentation/config/inversify.config";
import ShiftBadgeContainer from "./ShiftBadgeContainer";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import CashierUseCase from "@/domain/interactors/cashiers/CashierUseCase";
import { useEffect, useState } from "react";
import { ShiftStatus, useShiftStore } from "@/domain/store/CashierStore";
import { notifications } from "@mantine/notifications";
import { Modal, useModalsStack } from "@mantine/core";
import { Cashier } from "@/domain/types/CashierType";
import OpenCashier from "../Cashier/OpenCashier";
import CloseCashier from "../Cashier/CloseCashier";
import { LucideCheck, LucideX } from "lucide-react";

export default function ShiftBadge() {

    const cashierCase = container.get<CashierUseCase>(UseCaseTypes.CashierUseCase);
    const { updateShift, clearShift } = useShiftStore((state) => state);
    const stack = useModalsStack(['create', 'close']);
    const [cashierData, setCashierData] = useState<Cashier | null>()

    const getDataCashier = (id: string) => {
        const idNotification = notifications.show({
            loading: true,
            title: 'Operación de caja',
            message: 'Cargando datos de la caja',
            position: 'top-right',
            autoClose: false,
            withCloseButton: false,
        });
        cashierCase.getCashierById(id).then((response) => {
            notifications.update({
                id: idNotification,
                color: 'teal',
                title: 'Operación de caja',
                message: 'Datos cargando correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000
            });
             setCashierData(response.data as Cashier);
            stack.open('close');
        }).catch((error) => {
            console.log('Error al consultar caja:', error)
            notifications.update({
                id: idNotification,
                color: 'red',
                title: 'Operación de caja',
                message: 'Error cargando los datos de la caja',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000,
            });
        });
    }
    const validateCashier = () => {
        cashierCase.getCashierByuser().then((response) => {
            const cashier = response.data as Cashier;
            updateShift(cashier.id, cashier.state as ShiftStatus);
        }).catch((error) => {
            console.log('Error al consultar turno:', error)
            notifications.show({
                title: 'Consulta de caja/turnos',
                message: error.errorMessage,
                color: 'red',
                withCloseButton: true,
            })
        });
    }

    const handleActionCashier = (id?: string) => {
        if (id) {
            getDataCashier(id);
        } else {
            stack.open('create');
        }
    }

    useEffect(() => {
        validateCashier();
    }, [])

    return (
        <>
            <Modal.Stack>
                <Modal {...stack.register('create')} title="Apertura de caja">
                    <OpenCashier closeAction={() => stack.close('create')} successCallback={() => {
                        stack.close('create');
                        validateCashier();
                    }} />
                </Modal>
                <Modal {...stack.register('close')} title="Cierre de caja">
                    {cashierData && <CloseCashier cashier={cashierData} closeAction={() => stack.close('close')} successCallback={() => {
                        stack.close('close');
                        clearShift();
                        window.location.reload();
                    }} />}
                </Modal>
            </Modal.Stack>
            <ShiftBadgeContainer onAction={(value) => handleActionCashier(value)} />
        </>
    )
}