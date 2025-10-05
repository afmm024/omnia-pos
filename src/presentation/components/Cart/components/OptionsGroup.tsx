import { Grid, RadioGroup } from "@mantine/core";
import { PaymentType } from "../utils/FormParams";
import { useEffect, useState } from "react";
import { LucideDollarSign, LucideQrCode, LucideSquareStack } from "lucide-react";
import PaymentOptionCard from "./CardPaymentType";

interface Props{
    onSelectOption: (option: string) => void;
}

export default function OptionsGroup({onSelectOption}: Props) {
    const optionsPayment = [
        { value: 'efectivo', label: 'Efectivo', icon: LucideDollarSign},
        { value: 'transferencia', label: 'Transferencia', icon: LucideQrCode},
        { value: 'mixto', label: 'Mixto', icon: LucideSquareStack},
    ];
    const [value, setValue] = useState(optionsPayment[0].value);

    useEffect(() => {
        if(value){
            onSelectOption(value);
        }
    }, [value])

    return (
        <RadioGroup
            value={value}
            onChange={setValue}
            name="paymentSelector"
            style={{ maxWidth: 900, margin: '0 auto' }}
        >
            <Grid gutter="md">
                {optionsPayment.map((option) => (
                    <Grid.Col span={4} key={option.value}>
                        <PaymentOptionCard
                            option={option}
                            checked={value === option.value}
                            onChange={setValue}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </RadioGroup>
    )
}