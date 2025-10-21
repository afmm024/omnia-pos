import { Button, Drawer, Group, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import SupplierBox from "./components/SupplierBox";
import OptionsGroup from "./components/OptionsGroup";
import CartList from "./components/CartList";
import CartFooter from "./components/CartFooter";
import { useState } from "react";
import { useCartStore } from "@/domain/store/CartStore";
import { useDisclosure } from "@mantine/hooks";
import { formatColombianMoney, percentageValue } from "@/presentation/helpers/priceUtils";
import container from "@/presentation/config/inversify.config";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import { useShiftStore } from "@/domain/store/CashierStore";
import { notifications } from "@mantine/notifications";
import { BillItem, CashierBillCart } from "@/domain/types/CashierType";
import { LucideCheck, LucideX } from "lucide-react";
import BillUseCase from "@/domain/interactors/bill/BillUseCase";


export default function Cart() {
    const billCase = container.get<BillUseCase>(UseCaseTypes.BillUseCase);
    const [valueCash, setValueCash] = useState<string | number>(0);
    const [valueTransfer, setValueTransfer] = useState<string | number>(0);
    const { taxAmount, subtotal, paymentType, supplier, total, items, clearCart } = useCartStore((state) => state);
    const { shift } = useShiftStore((state) => state);
    const [opened, { open, close }] = useDisclosure(false);

    const generateBill = () => {
        if (paymentType === "mixto") {
            const cash = valueCash as number;
            const transfer = valueTransfer as number;
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
                payloadBill.CashAmount = valueCash as number;
                payloadBill.TransferAmount = valueTransfer as number;
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
        payloadBill.Taxes = listItems.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.Taxes;
        }, 0);

        if (shift) {
            const idNotification = notifications.show({
                loading: true,
                title: 'Operación de factura',
                message: 'Generando factura',
                position: 'top-right',
                autoClose: false,
                withCloseButton: false,
            });
            billCase.createBill(shift?.id, payloadBill).then(() => {
                notifications.update({
                    id: idNotification,
                    color: 'teal',
                    title: 'Operación de factura',
                    message: 'Factura generada correctamente',
                    icon: <LucideCheck size={18} />,
                    loading: false,
                    autoClose: 3000
                });
                close();
                clearCart();
                setValueCash(0);
                setValueTransfer(0);
            }).catch((error) => {
                console.log('Error al cerrar caja:', error)
                notifications.update({
                    id: idNotification,
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
            <Drawer position="right" size={'md'} opened={opened} onClose={close} title="Confirmación de factura">
                <Stack gap={'md'}>
                    <TextInput
                        label="Tercero a facturar"
                        value={`${supplier?.name} - ${supplier?.document}`}
                        disabled
                    />
                    <TextInput
                        label="Tipo de pago"
                        value={`${paymentType}`}
                        disabled
                    />
                    {paymentType === 'mixto' && <Group gap={'md'} m={'auto'}>
                        <NumberInput
                            w={180}
                            label="Valor efectivo"
                            min={0}
                            value={valueCash}
                            onChange={(value) => setValueCash(value)}
                        />
                        <NumberInput
                            w={180}
                            label="Valor transferencia"
                            min={0}
                            value={valueTransfer}
                            onChange={(value) => setValueTransfer(value)}
                        />
                    </Group>}
                    <TextInput
                        label="Total a pagar"
                        value={`${formatColombianMoney(total)}`}
                        disabled
                    />
                    <TextInput
                        label="Cantidad de productos a facturar"
                        value={`${items.length}`}
                        disabled
                    />
                    <Button onClick={generateBill}>Generar factura</Button>
                    <Button variant="outline" onClick={close}>Cancelar</Button>
                </Stack>
            </Drawer>
            <Stack justify="space-between" gap={'sm'} h={'100dvh'} p={20}>
                <div>
                    <SupplierBox />
                    <OptionsGroup />
                </div>
                <div>
                    <CartList />
                </div>
                <div >
                    <CartFooter />
                    <Button disabled={items.length === 0} onClick={handleOpenConfirmBill} size="md" fullWidth>
                        Generar factura
                    </Button>
                </div>
            </Stack>
        </>
    )
}