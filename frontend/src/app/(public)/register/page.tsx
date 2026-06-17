import RegisterForm from "@/components/auth/RegisterForm";
import Image from "next/image";

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 px-4">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full">
                <div className="hidden md:block w-1/2 relative">
                    <Image
                        src="/landing/hero-carausel-2.jpeg"
                        alt="Join our trek community"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
                    <RegisterForm />
                </div>
            </div>
        </main>
    );
}
