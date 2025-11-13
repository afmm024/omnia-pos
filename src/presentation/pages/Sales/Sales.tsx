"use client"
import DashboardLayout from "@/presentation/components/Layouts/DashboardLayout";
import SalesContainer from "./SalesContainer";
import container from "@/presentation/config/inversify.config";
import BillUseCase from "@/domain/interactors/bill/BillUseCase";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { useEffect, useMemo, useState } from "react";
import { CashierBill } from "@/domain/types/CashierType";
import { notifications } from "@mantine/notifications";


export default function SalesPage() {

    const billCase = container.get<BillUseCase>(UseCaseTypes.BillUseCase);
    const [isLoading, setIsLoading] = useState(false);
    const [cashiersBills, setCashiersBills] = useState<CashierBill[]>([]);

    const sortedItemsDesc = useMemo(() => {
        const sortedArray = [...cashiersBills];
        sortedArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return sortedArray;
        
    }, [cashiersBills]);

    const loadAllBills = () => {
        setIsLoading(true);
        billCase.getAllBills().then((response: any) => {
            setCashiersBills(response.data as CashierBill[]);
            notifications.show({
                title: 'Consulta de facturas',
                message: 'Se ha consultado las facturas correctamente',
                color: 'green',
                withCloseButton: true,
            })
        }).catch((error) => {
            console.error('Error al buscar productos:', error);
            notifications.show({
                title: 'Consulta de facturas',
                message: 'Ha ocurrido un error al consultar las facturas',
                color: 'red',
                withCloseButton: true,
            })
        }).finally(() => {
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loadAllBills();
    }, [])

    
    return (
        <DashboardLayout>
            <SalesContainer isLoading={isLoading} bills={sortedItemsDesc} handleRefresh={loadAllBills} />
        </DashboardLayout>
    )
}