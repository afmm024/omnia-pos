"use client"
import DashboardLayout from "@/presentation/components/Layouts/DashboardLayout";
import SalesContainer from "./SalesContainer";
import { useEffect, useState } from "react";
import { Cashier } from "@/domain/types/CashierType";
import container from "@/presentation/config/inversify.config";
import CashierUseCase from "@/domain/interactors/cashiers/CashierUseCase";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { notifications } from "@mantine/notifications";

export default function SalesPage() {

    const cashierCase = container.get<CashierUseCase>(UseCaseTypes.CashierUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [cashiers, setCashiers] = useState<Cashier[]>([]);

    const loadCashiers = () => {
        setIsLoading(true);
        cashierCase.getAllCashiers().then((response) => {
            setCashiers(response.data as Cashier[]);
            notifications.show({
                title: 'Consulta de turnos',
                message: 'Se ha consultado los turnos correctamente',
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
            <SalesContainer isLoading={isLoading} cashiers={cashiers} handleRefresh={() => { }} />
        </DashboardLayout>
    )
}