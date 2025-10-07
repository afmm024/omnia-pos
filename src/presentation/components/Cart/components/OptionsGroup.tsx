import { Grid, RadioGroup } from "@mantine/core";
import { useEffect, useState } from "react";
import PaymentOptionCard from "./CardPaymentType";
import { useCartStore } from "@/domain/store/CartStore";

interface Props {
    
}

export default function OptionsGroup({  }: Props) {

    const { paymentOptions, paymentType, setPaymentType } = useCartStore((state) => state);

    return (
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
    )
}