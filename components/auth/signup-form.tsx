"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/lib/auth-modal-context";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function SignupForm() {
    const router = useRouter();
    const { switchMode, closeModal } = useAuthModal();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        // Replace with your actual signup API later
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: phoneNumber }),
        });

        setIsLoading(false);

        if (res.ok) {
            closeModal();
            router.push("/");
        } else {
            alert("Signup failed. Please try again.");
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

            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-[#ee4d2d] text-lg placeholder-gray-400"
                    required
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#ee4d2d] hover:bg-[#d93e24] disabled:bg-orange-400 text-white font-semibold py-4 rounded-xl text-lg transition-all active:scale-[0.98]"
                >
                    {isLoading ? "Processing..." : "NEXT"}
                </button>

                <div className="relative my-8">
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
                    Have an account?{" "}
                    <button
                        type="button"
                        onClick={() => switchMode("login")}
                        className="text-[#ee4d2d] font-semibold hover:underline"
                    >
                        Log In
                    </button>
                </p>
            </form>
        </div>
    );
}