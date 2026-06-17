"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/api/operations/authAPIs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const setUser = useAuthStore((state) => state.setUser);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await login(email, password);

            if (response.status === 200) {
                toast.success("Login successful!");
                const user = response.data.user;

                setUser(user);

                setTimeout(() => {
                    // Check for redirect URL first
                    const redirectUrl =
                        sessionStorage.getItem("redirectAfterLogin");

                    if (redirectUrl) {
                        // Clear the stored URL
                        sessionStorage.removeItem("redirectAfterLogin");
                        // Redirect to the intended page
                        router.push(redirectUrl);
                    } else {
                        // Default role-based redirects
                        if (user.role === "leader") {
                            router.push("/leader");
                        } else if (user.role === "admin") {
                            router.push("/admin");
                        } else {
                            router.push("/");
                        }
                    }
                }, 100);
            }
        } catch (error: unknown) {
            console.error("Login failed:", error);
            toast.error("Please check your credentials.");
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google login");
        // Replace with NextAuth Google provider
    };

    return (
        <form
            onSubmit={handleLogin}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
            <h2 className="text-2xl font-bold text-emerald-700 text-center">
                Login to Paaydal Trekkers
            </h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-emerald-600"
            />

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-emerald-600"
                />
                <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-500 font-medium transition"
            >
                Login
            </button>

            <div className="text-center text-sm text-gray-600">or</div>

            <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
                <FcGoogle size={20} />
                Continue with Google
            </button>

            <p className="text-sm text-center text-gray-600 mt-4">
                Don’t have an account?{" "}
                <a
                    href="/register"
                    className="text-emerald-700 font-medium hover:underline"
                >
                    Register
                </a>
            </p>
        </form>
    );
}
