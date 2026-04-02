"use client"

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
                {/* Global popup modal */}
                <AuthModal />
            </AuthModalProvider>
        </CartProvider>
    )
}