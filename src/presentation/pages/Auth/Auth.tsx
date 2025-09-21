import AuthLayout from "@/presentation/components/Layouts/AuthLayout";
import AuthForm from "./sections/AuthForm";
import LogtoService from "@/data/provider/logto/LogtoService";

export default async function AuthPage() {

    const logtoService = new LogtoService();
    const profile = await logtoService.profileUser();


    return (
        <AuthLayout userName={profile.name ?? null}>
            <AuthForm profile={profile}/>
        </AuthLayout>
    );
}