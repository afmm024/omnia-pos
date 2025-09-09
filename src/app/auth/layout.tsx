import { ImageResources } from "@/presentation/config/resources";
import Image from "next/image";


export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Image with quote */}
            <div className="flex-1 relative bg-gray-100">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                >
                    {/* Modern office background simulation */}
                    <div className="absolute inset-0 bg-linear-to-bl from-primary-500 to-secondary-400">
                        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-100 rounded-full opacity-30"></div>
                        <div className="absolute top-40 right-32 w-24 h-24 bg-primary-100 rounded-lg opacity-40"></div>
                        <div className="absolute bottom-32 left-32 w-40 h-40 bg-primary-100 rounded-full opacity-25"></div>
                    </div>
                    {/* Quote overlay */}
                    <div className="absolute bottom-16 left-8 right-8 text-white z-10">
                        <div className="max-w-md">
                            <div className="text-4xl font-bold mb-4 opacity-80">❝</div>
                            <blockquote className="text-lg font-medium leading-relaxed mb-4">
                                Si creas una experiencia excelente, los clientes se lo contarán entre ellos. El voz a voz es muy poderoso.
                            </blockquote>
                            <cite className="text-sm opacity-75">
                                Jeff Bezos, Fundador de Amazon
                            </cite>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right side - Children auth panel */}
            <div className="w-200 bg-white flex flex-col">
                {/* Header */}
                <div className="p-8 pb-3">
                    <div className="flex items-center mb-1">
                        <Image alt="logo temporal" width={200} className="m-auto" height={200} src={ImageResources.logo} />
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}