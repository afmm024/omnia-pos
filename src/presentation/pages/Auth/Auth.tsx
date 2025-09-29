import AuthLayout from "@/presentation/components/Layouts/AuthLayout";
import AuthForm from "./sections/AuthForm";

export default async function AuthPage() {

    return (
        <AuthLayout>
            <AuthForm/>
        </AuthLayout>
    );
}