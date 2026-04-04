"use client"

import { Suspense } from "react"
import { CartProvider } from "@/lib/cart-context"
import { AuthModalProvider } from "@/lib/auth-modal-context"
import AuthModal from "@/components/auth/auth-modal"

export default function Providers({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <CartProvider>
            <AuthModalProvider>
                {children}
                <Suspense fallback={null}>
                    <AuthModal />
                </Suspense>
            </AuthModalProvider>
        </CartProvider>
    )
}