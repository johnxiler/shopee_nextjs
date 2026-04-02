"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAuthModal } from "@/lib/auth-modal-context";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function AuthModal() {
    const { isOpen, mode, closeModal, switchMode, openModal } = useAuthModal();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const authParam = searchParams.get("auth") || null;

    // Sync URL → Modal (only when URL changes externally)
    useEffect(() => {
        if (authParam === "login" || authParam === "signup") {
            if (authParam !== mode) {
                openModal(authParam as "login" | "signup");
            }
        }
    }, [authParam]);

    if (!isOpen) return null;

    const handleClose = () => {
        // Clean URL when closing
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.delete("auth");
        const query = currentParams.toString();
        router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
        closeModal();
    };

    const handleSwitchMode = (newMode: "login" | "signup") => {
        if (newMode === mode) return;

        // Update URL first (feels more responsive)
        router.push(`${pathname}?auth=${newMode}`, { scroll: false });

        // Then switch mode immediately
        switchMode(newMode);
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={handleClose}
        >
            <div
                className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-50 bg-white text-gray-500 hover:text-gray-800 rounded-full p-2 shadow-md"
                >
                    ✕
                </button>

                <div className="flex min-h-[620px] flex-col lg:flex-row">
                    {/* LEFT BANNER - Changes based on mode */}
                    <div className="hidden lg:flex lg:w-1/2 bg-[#ee4d2d] relative overflow-hidden flex-col justify-center items-center p-10 text-white">
                        {mode === "login" ? (
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                                        <span className="text-[#ee4d2d] text-5xl font-bold">S</span>
                                    </div>
                                    <span className="text-6xl font-bold">Shopee</span>
                                </div>
                                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                                <p className="text-xl opacity-90 max-w-sm">
                                    Log in to continue shopping and enjoy exclusive deals.
                                </p>
                            </div>
                        ) : (
                            <div className="text-center relative">
                                <div className="absolute inset-0 pointer-events-none">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute text-4xl animate-float"
                                            style={{
                                                left: `${15 + (i % 4) * 18}%`,
                                                top: `${20 + Math.floor(i / 3) * 25}%`,
                                                animationDelay: `${i * 0.3}s`,
                                            }}
                                        >
                                            🪙
                                        </div>
                                    ))}
                                </div>

                                <div className="relative z-10">
                                    <div className="text-[140px] font-black tracking-tighter mb-4">4.4</div>

                                    <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white text-4xl font-bold py-4 px-10 rounded-3xl inline-block mb-8 shadow-2xl -rotate-2">
                                        SHOPEE ALL-OUT<br />MEGA CAR PANALO
                                    </div>

                                    <div className="bg-yellow-400 text-red-600 font-bold text-xl py-4 px-10 rounded-2xl inline-block shadow-xl">
                                        CHECK IN FOR A CHANCE TO<br />
                                        WIN A BRAND NEW CAR!
                                    </div>

                                    <div className="mt-10 text-2xl font-bold">4.4 IS ON APR 1</div>
                                    <div className="text-lg opacity-90">with More Deals from Apr 2 - 7</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Form */}
                    <div className="flex-1 flex items-center justify-center p-8 lg:p-12 bg-white">
                        <div className="w-full max-w-md">
                            {mode === "login" ? <LoginForm /> : <SignupForm />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}