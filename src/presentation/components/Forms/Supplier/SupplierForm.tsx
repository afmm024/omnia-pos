import SupplierUseCase from "@/domain/interactors/suppliers/SuppliersUseCase";
import UseCaseTypes from "@/domain/types/UseCaseTypes";
import container from "@/presentation/config/inversify.config";
import { typeDocuments } from "@/presentation/helpers/dataGeneric";
import { calcularDV_NIT } from "@/presentation/helpers/nitUtils";
import { Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { LucideCheck, LucideX } from "lucide-react";
import { useMemo } from "react";

interface FormData {
    name: string;
    email: string;
    phone: string;
    typeDocument: string;
    document: string;
    dv: string;
}

interface Props {
    onSucess: (supplier: any) => void;
}


export default function SupplierForm({onSucess}: Props) {

    const supplierCase = container.get<SupplierUseCase>(UseCaseTypes.SupplierUseCase);

    const form = useForm<FormData>({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            typeDocument: 'Cedula de ciudadania',
            document: '',
            dv: ''
        },

        validate: {
            name: (value) =>
                value.trim().length < 2 ? 'Nombre completo debe tener al menos 2 caracteres' : null,
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
            phone: (value) => value.replace(/\D/g, '').length < 7 ? 'Teléfono debe tener al menos 7 dígitos' : null,
            document: (value, values) => {
                if (values.typeDocument === 'NIT' && value.replace(/\D/g, '').length === 0) {
                    return 'El NIT es obligatorio';
                }
                if (value.trim().length === 0) {
                    return 'El número de documento es obligatorio';
                }
                return null;
            },
        },
    });

    const isNIT = form.values.typeDocument === 'NIT';

    const dvCalculado = useMemo(() => {
        if (isNIT && form.values.document.trim().length > 0) {
            const result = calcularDV_NIT(form.values.document);
            form.setValues({ dv: result.toString() })
            return result
        }
        return null;
    }, [isNIT, form.values.document]);

    const handleSubmit = (values: FormData) => {
        const idNotification = notifications.show({
            loading: true,
            title: 'Operación de terceros',
            message: 'Creando tercero',
            position: 'top-right',
            autoClose: false,
            withCloseButton: false,
        });
        supplierCase.createSupplier(values).then((response) => {
            notifications.update({
                id: idNotification,
                color: 'teal',
                title: 'Operación de terceros',
                message: 'Tercero creado correctamente',
                icon: <LucideCheck size={18} />,
                loading: false,
                autoClose: 3000
            });
            onSucess(response?.data)
        }).catch((error) => {
            console.error('Error al crear tercero:', error);
            notifications.update({
                id: idNotification,
                color: 'red',
                title: 'Operación de terceros',
                message: 'Error al crear el tercero',
                icon: <LucideX size={18} />,
                loading: false,
                autoClose: 3000
            });
        })
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={'md'}>
                <TextInput
                    label="Nombre Completo"
                    placeholder="Ej: Juan Pérez"
                    required
                    {...form.getInputProps('name')}
                />
                <Select
                    label="Tipo de Documento"
                    placeholder="Selecciona uno"
                    data={typeDocuments}
                    {...form.getInputProps('typeDocument')}
                />
                <Group gap={'xs'} justify="space-between">
                    <TextInput
                        style={{ flexGrow: 1 }}
                        label="Número de Documento"
                        placeholder={isNIT ? "Ej: 900123456" : "Ej: 123456789"}
                        required
                        type="text"
                        {...form.getInputProps('document')}
                        onFocus={(event) => {
                            if (isNIT) {
                                form.setFieldValue('document', event.currentTarget.value.replace(/\D/g, ''));
                            }
                        }}
                    />
                    {isNIT && (
                        <TextInput
                            label="DV"
                            w={80}
                            value={dvCalculado || '-'}
                            readOnly
                            disabled
                        />
                    )}
                </Group>
                <TextInput
                    label="Correo Electrónico"
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    label="Teléfono"
                    placeholder="310 123 4567"
                    type="tel"
                    required
                    {...form.getInputProps('phone')}
                />
                <Button disabled={!form.isValid()} type="submit">Crear tercero</Button>
            </Stack>
        </form>
    )
}