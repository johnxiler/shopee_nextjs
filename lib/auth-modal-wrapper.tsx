// components/auth/auth-modal-wrapper.tsx
"use client"
import { AuthModalProvider } from "@/lib/auth-modal-context"
import AuthModal from "@/components/auth/auth-modal"

export default function AuthModalWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthModalProvider>
            {children}
            <AuthModal />
        </AuthModalProvider>
    )
}