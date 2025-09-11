"use client"
import { useState } from "react";
import AuthForm from "./sections/AuthForm";
import { addToast, Spinner } from "@heroui/react";
import container from "@/presentation/config/inversify.config";
import AuthUseCase from "@/domain/interactors/auth/AuthUseCase";
import UseCaseTypes from "@/domain/types/UseCaseTypes";

export default function AuthPage() {

    const [isLoading, setIsLoading] = useState(false);
    const authUseCase = container.get<AuthUseCase>(UseCaseTypes.AuthUseCase);


    const handleSubmit = async(values: any) => {
        setIsLoading(true);
        console.log(values)
        try {
            const response = await authUseCase.userAuthentication(values.document, values.password)
            console.log(response)
            addToast({
              title: "Inicio de sesión",
              description: "Autenticación exitosa",
              color: "success",
            })
            setIsLoading(false)
        } catch (error: any) {
            console.log(error)
            addToast({
              title: "Inicio de sesión",
              description: error.errorMessage,
              color: "danger",
            })
            setIsLoading(false)
        }
    }
    
    if(isLoading) return (
        <div className="flex-1 px-2 text-center">
            <Spinner color="primary" size="lg" label="Iniciando sesión...." />
        </div>
    )

    return (
        <div className="flex-1 px-2">
            <h1 className="text-[2rem] font-semibold text-gray-900 mb-2 text-center">Bienvenido de nuevo.</h1>
            <p className="text-lg text-gray-600 text-center">Ingresa tu credenciales para comenzar tu turno.</p>
            <AuthForm submitForm={handleSubmit} />
        </div>
    );
}