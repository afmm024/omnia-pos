import BaseButton from "@/presentation/components/Button/Button";
import BaseInput from "@/presentation/components/Form/Input";
import InputPassword from "@/presentation/components/Form/PasswordInput";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Controller, useForm } from "react-hook-form";

type Props = {
    submitForm: (values: any) => void
}

export default function AuthForm({ submitForm }: Props) {
    const { handleSubmit, control , formState: { errors } } = useForm();
    return (
        <div className="relative mx-20 my-10">
            <Form className="w-full flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
                <Controller
                    name="document"
                    control={control}
                    rules={{ required: "El documento es requerido" }}
                    render={({ field }) => (
                        <BaseInput
                            {...field}
                            label="No. de documento"
                            type="number"
                            isInvalid={!!errors.document}
                            errorMessage={errors.document?.message?.toString()}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={{ required: "La contraseña es requerida", minLength: { value: 6, message: "Debe contener minimo 6 caracteres" } }}
                    render={({ field }) => (
                        <InputPassword
                            {...field}
                            label="Contraseña"
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message?.toString()}
                        />
                    )}
                />

                <BaseButton color="primary"  type="submit">Iniciar sesión</BaseButton>
            </Form>
        </div>
    )
}