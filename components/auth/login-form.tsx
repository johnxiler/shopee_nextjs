"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/lib/auth-modal-context";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function LoginForm() {
    const router = useRouter();
    const { switchMode, closeModal } = useAuthModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        setIsLoading(false);

        if (res.ok) {
            closeModal();
            router.push("/");
        } else {
            alert("Invalid login credentials");
        }
    }

    return (
        <div className="w-full max-w-md">
            {/* Shopee Logo */}
            <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">S</span>
                </div>
                <span className="text-3xl font-bold text-[#ee4d2d]">Shopee</span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Log In</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    placeholder="Phone number / Username / Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#ee4d2d] text-lg placeholder-gray-400"
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#ee4d2d] text-lg placeholder-gray-400"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#ee4d2d] hover:bg-[#d93e24] disabled:bg-orange-400 text-white font-semibold py-4 rounded-xl text-lg transition-all active:scale-[0.98]"
                >
                    {isLoading ? "Logging in..." : "LOG IN"}
                </button>

                <div className="text-right">
                    <a href="#" className="text-blue-600 hover:underline text-sm">
                        Forgot Password?
                    </a>
                </div>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-6 text-sm text-gray-500">OR</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 py-4 rounded-xl font-medium transition-colors"
                    >
                        <FaFacebook />
                        Facebook
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 py-4 rounded-xl font-medium transition-colors"
                    >
                        <FaGoogle />
                        Google
                    </button>
                </div>

                <p className="text-center text-sm text-gray-600 mt-8">
                    New to Shopee?{" "}
                    <button
                        type="button"
                        onClick={() => switchMode("signup")}
                        className="text-[#ee4d2d] font-semibold hover:underline"
                    >
                        Sign Up
                    </button>
                </p>
            </form>
        </div>
    );
}