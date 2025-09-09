"use client"
import AuthForm from "./sections/AuthForm";

export default function AuthPage() {
    return (
        <div className="flex-1 px-2">
            <h1 className="text-[2rem] font-semibold text-gray-900 mb-2 text-center">Bienvenido de nuevo.</h1>
            <p className="text-lg text-gray-600 text-center">Ingresa tu credenciales para comenzar tu turno.</p>
            <AuthForm submitForm={(values) => console.log(values)} />
        </div>
    );
}