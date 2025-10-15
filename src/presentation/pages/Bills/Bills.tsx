"use client"
import CashierUseCase from "@/domain/interactors/cashiers/CashierUseCase";
import { CashierBill } from "@/domain/types/CashierType";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import DashboardLayout from "@/presentation/components/Layouts/DashboardLayout";
import container from "@/presentation/config/inversify.config";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import BillsContainer from "./BillsContainer";
import BillUseCase from "@/domain/interactors/bill/BillUseCase";

interface Props {
    shift: string;
}

export default function BillsPage({ shift }: Props) {

    const billCase = container.get<BillUseCase>(UseCaseTypes.BillUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [cashiersBills, setCashiersBills] = useState<CashierBill[]>([]);

    const loadCashiers = () => {
        setIsLoading(true);
        billCase.getBills(shift).then((response) => {
            setCashiersBills(response.data as CashierBill[]);
            notifications.show({
                title: 'Consulta de facturas por turno',
                message: 'Se ha consultado las facturas correctamente',
                color: 'green',
                withCloseButton: true,
            })
        }).catch((error) => {
            console.error('Error al buscar productos:', error);
            notifications.show({
                title: 'Consulta de turnos',
                message: 'Ha ocurrido un error al consultar los turnos',
                color: 'red',
                withCloseButton: true,
            })
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadCashiers();
    }, [])

    return (
        <DashboardLayout>
            <BillsContainer isLoading={isLoading} bills={cashiersBills} handleRefresh={() => loadCashiers()} />
        </DashboardLayout>
    )
}