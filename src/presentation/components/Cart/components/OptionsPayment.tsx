import { Grid, Group, NumberInput, Stack } from "@mantine/core";
import PaymentOptionCard from "./CardPaymentType";
import { useCartStore } from "@/domain/store/CartStore";
import { useEffect, useState } from "react";

interface Props {

}

export default function OptionsPayment({ }: Props) {
    const { paymentOptions, paymentType, setPaymentType, total, updateCash, updateTransfer } = useCartStore((state) => state);
    const [valueCash, setValueCash] = useState<number>(0);
    const [valueTransfer, setValueTransfer] = useState<number>(0);

    useEffect(() => {
        if (paymentType === "efectivo") {
            updateCash(total);
            updateTransfer(0);
            setValueCash(0)
            setValueTransfer(0)
        } else if (paymentType === "transferencia") {
            updateTransfer(total);
            updateCash(0);
            setValueCash(0)
            setValueTransfer(0)
        } else if (paymentType === "mixto") {
            updateCash(valueCash);
            updateTransfer(valueTransfer);
        }
    }, [paymentType])

    useEffect(() => {
        updateCash(valueCash);
        updateTransfer(valueTransfer);
    }, [valueCash, valueTransfer])
    return (
        <Stack gap={"md"}>
            <Grid gutter="md">
                {paymentOptions.map((option) => (
                    <Grid.Col span={4} key={option.value}>
                        <PaymentOptionCard
                            option={option}
                            checked={paymentType === option.value}
                            onChange={setPaymentType}
                        />
                    </Grid.Col>
                ))}
            </Grid>
            {paymentType === "mixto" &&
                <Group gap={'md'} m={'auto'}>
                    <NumberInput
                        w={180}
                        label="Valor efectivo"
                        min={0}
                        value={valueCash}
                        onChange={(value) => {
                            setValueCash(Number(value));
                            setValueTransfer(total - Number(value));
                        }}
                        error={valueCash > total || valueCash < 0}
                    />
                    <NumberInput
                        w={180}
                        label="Valor transferencia"
                        min={0}
                        value={valueTransfer}
                        onChange={(value) => {
                            setValueTransfer(Number(value));
                            setValueCash(total - Number(value));
                        }}
                        error={valueTransfer > total || valueTransfer < 0}
                    />
                </Group>
            }
        </Stack>
    )
}