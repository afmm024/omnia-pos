import { Button, Drawer, Stack, Title } from "@mantine/core";
import CartList from "./components/CartList";
import { useState } from "react";
import { useCartStore } from "@/domain/store/CartStore";
import { useDisclosure } from "@mantine/hooks";
import { percentageValue } from "@/presentation/helpers/priceUtils";
import container from "@/presentation/config/inversify.config";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { useShiftStore } from "@/domain/store/CashierStore";
import { notifications } from "@mantine/notifications";
import { BillItem, CashierBillCart } from "@/domain/types/CashierType";
import { LucideCheck, LucideX } from "lucide-react";
import BillUseCase from "@/domain/interactors/bill/BillUseCase";
import CartResume from "./components/CartTotalResume";
import ResumeBill from "./components/ResumeBill";
import { useThermalReceipt } from "@/presentation/hooks/useGeneratorBill";
import { FactusResponse } from "@/domain/types/BillFactusType";
import { companyDefault } from "@/presentation/helpers/dataGeneric";
import { useQZTrayStore } from "@/domain/store/PrinterStore";


export default function Cart() {
    const billCase = container.get<BillUseCase>(UseCaseTypes.BillUseCase);
    const { paymentType, supplier, total, subtotal, items, clearCart, taxAmount, cash, transfer, totalItems } = useCartStore((state) => state);
    const { printData , defaultPrinter} = useQZTrayStore();
    const { generatePrintDataDian } = useThermalReceipt();
    const { shift } = useShiftStore((state) => state);
    const [opened, { open, close }] = useDisclosure(false);

    const syncAndPrintBill = async(billId: string) => {
        const id = notifications.show({
            loading: true,
            title: 'Operación de factura',
            message: 'Sincronizando factura',
            position: 'top-right',
            autoClose: false,
            withCloseButton: false,
        });

        billCase.syncBill(billId).then(async (response) => {
            const factusData = response.data as FactusResponse;
            notifications.update({
                id: id,
                color: 'teal',
                title: 'Operación de factura',
                message: 'Factura sincronizada correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000
            });
            try {
                const rawReceipt = await generatePrintDataDian({
                    total: total,
                    subTotal: subtotal,
                    items: items,
                    companyInformation: companyDefault,
                    paymentType: paymentType!,
                    supplierInformation: supplier!,
                    billInformation: factusData.data,
                    taxes: taxAmount,
                    totalItems: totalItems,

                })
                
                if(defaultPrinter){
                    await printData(defaultPrinter, rawReceipt)
                }

            } catch (error) {
                console.error(error)
            }
            clearCart();
            close();
        }).catch((error) => {
            console.log('Error al sincronizar la factura:', error)
            notifications.update({
                id: id,
                color: 'red',
                title: 'Operación de factura',
                message: 'Error al sincronizar la factura',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000
            });
        });
    }

    const generateBill = () => {
        if (paymentType === "mixto") {
            if ((cash + transfer) !== total) {
                notifications.show({
                    message: "Los valores del pago mixto no coinciden con el total de la factura",
                    color: "orange"
                })
                return;
            }
        }

        if (!supplier) {
            notifications.show({
                message: "La factura no tiene un tercero seleccionado",
                color: "orange"
            })
            return;
        }
        var payloadBill: CashierBillCart = {
            SupplierId: "",
            TypePayment: "",
            Total: 0,
            Taxes: 0,
            CashAmount: 0,
            TransferAmount: 0,
            Items: []
        };
        payloadBill.SupplierId = supplier ? supplier?.id : "";
        payloadBill.TypePayment = paymentType ? paymentType : "";
        payloadBill.Total = total;
        switch (paymentType) {
            case "efectivo":
                payloadBill.CashAmount = total
                break;
            case "transferencia":
                payloadBill.TransferAmount = total
                break;
            case "mixto":
                payloadBill.CashAmount = cash
                payloadBill.TransferAmount = transfer
                break;
        }
        var listItems: BillItem[] = [];
        items.forEach((item) => {
            var taxes = 0;
            switch (item.taxes) {
                case 'Impoconsumo 8%':
                    taxes = percentageValue(item.price, 8);
                    break;
            }
            listItems.push({
                IdProduct: item.id,
                Quantity: item.quantity,
                Price: item.price,
                Name: item.name,
                Taxes: taxes,
                Total: item.price * item.quantity,
                TaxesId: item.taxes
            })
        });
        payloadBill.Items = listItems;
        payloadBill.Taxes = taxAmount;

        if (shift) {
            const id = notifications.show({
                loading: true,
                title: 'Operación de factura',
                message: 'Generando factura',
                position: 'top-right',
                autoClose: false,
                withCloseButton: false,
            });

            billCase.createBill(shift?.id, payloadBill).then((response) => {
                notifications.update({
                    id: id,
                    color: 'teal',
                    title: 'Operación de factura',
                    message: 'Factura generada correctamente',
                    icon: <LucideCheck size={18} />,
                    loading: false,
                    autoClose: 3000
                });
                syncAndPrintBill(response.data as string);

            }).catch((error) => {
                console.log('Error al crear factura:', error)
                notifications.update({
                    id: id,
                    color: 'red',
                    title: 'Operación de factura',
                    message: 'Error al crear la factura',
                    icon: <LucideX size={18} />,
                    loading: false,
                    autoClose: 3000
                });
            });
        }
    }

    const handleOpenConfirmBill = () => {
        if (shift) {
            open()
        } else {
            notifications.show({
                message: "No hay un turno activo para facturar",
                color: "orange"
            })
        }
    }

    return (
        <>
            <Drawer overlayProps={{ backgroundOpacity: 0.5, blur: 4 }} position="right" size={'md'} opened={opened} onClose={close} title="Confirmación de factura">
                <ResumeBill onCancel={close} onConfirm={generateBill} />
            </Drawer>
            <Stack justify="space-between" gap={'sm'} h={'100dvh'} p={20}>
                <div>
                    <CartList />
                </div>
                <div >
                    <CartResume />
                    <Button disabled={items.length === 0} onClick={handleOpenConfirmBill} size="md" fullWidth>
                        Confirmar factura
                    </Button>
                </div>
            </Stack>
        </>
    )
}