import ProductsUseCase from "@/domain/interactors/products/ProductsUseCase";
import { Product } from "@/domain/types/ProductType"
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { Button, Grid, NumberInput, Select, Stack, Switch, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { TypeProduct, TypeTax } from "../utils/FormParams";
import { ProductDTO } from "@/data/types/product.type";
import { LucideCheck, LucideDollarSign, LucideX } from "lucide-react";

interface Props {
    successCallback: () => void
    closeAction: () => void
}

export default function AddProductForm({ successCallback, closeAction }: Props) {

    const productCase = container.get<ProductsUseCase>(UseCaseTypes.ProductsUseCase);

    const createProduct = (data: Product) => {
        console.log(data)
        const id = notifications.show({
            loading: true,
            title: 'Operación de producto',
            message: 'Creando registro',
            autoClose: false,
            withCloseButton: false,
        });
        const payload: ProductDTO = {
            Name: data.name,
            Price: data.price,
            Type: data.type,
            State: data.state,
            Taxes: data.taxes,
            Unit: data.unit,
        }
        productCase.createProduct(payload).then(() => {
            notifications.update({
                id,
                color: 'teal',
                title: 'Operación de producto',
                message: 'Registro creado correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000,
            });
            successCallback();
        }).catch((error) => {
            console.error('Error al crear el producto:', error);
            notifications.update({
                id,
                color: 'red',
                title: 'Operación de producto',
                message: 'Error creando el registro',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000,
            });
        })
    }

    const form = useForm<Product>({
        mode: 'uncontrolled',
        initialValues: {
            id: "",
            name: "",
            price: "",
            type: "",
            state: true,
            taxes: "",
            unit: "unidad"
        },
        validate: {
            name: isNotEmpty('Campo requerido'),
            price: isNotEmpty('Campo requerido'),
            type: isNotEmpty('Campo requerido'),
        },
    });
    return (
        <form onSubmit={form.onSubmit(createProduct)}>
            <Grid>
                <Grid.Col span={6}>
                    <Stack gap={'md'}>
                        <Select
                            label="Tipo de producto"
                            placeholder="Tipo de producto"
                            data={TypeProduct}
                            key={form.key('type')}
                            {...form.getInputProps('type')}
                        />
                        <TextInput
                            label="Nombre del producto"
                            placeholder="Nombre del producto"
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Stack gap={'md'}>
                        <NumberInput
                            label="Precio del producto"
                            placeholder="Precio del producto"
                            leftSection={<LucideDollarSign size={16} />}
                            key={form.key('price')}
                            {...form.getInputProps('price')}
                        />
                         <Select
                            label="Impuestos del producto"
                            placeholder="Impuesto del producto"
                            data={TypeTax}
                            key={form.key('taxes')}
                            {...form.getInputProps('taxes')}
                        />
                    </Stack>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Stack gap={'md'}>
                        
                       
                    </Stack>
                </Grid.Col>
            </Grid>
        </form >

    )
}