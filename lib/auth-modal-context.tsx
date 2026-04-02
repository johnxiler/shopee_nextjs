"use client"
import { createContext, useContext, useState, ReactNode } from "react"

type AuthMode = "login" | "signup"

interface AuthModalContextProps {
    isOpen: boolean
    mode: AuthMode
    openModal: (mode?: AuthMode) => void
    closeModal: () => void
    switchMode: (mode: AuthMode) => void
}

const AuthModalContext = createContext<AuthModalContextProps | undefined>(undefined)

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<AuthMode>("login")

    const openModal = (initialMode: AuthMode = "login") => {
        setMode(initialMode)
        setIsOpen(true)
    }

    const closeModal = () => setIsOpen(false)
    const switchMode = (newMode: AuthMode) => setMode(newMode)

    return (
        <AuthModalContext.Provider value={{ isOpen, mode, openModal, closeModal, switchMode }}>
            {children}
        </AuthModalContext.Provider>
    )
}

export const useAuthModal = () => {
    const context = useContext(AuthModalContext)
    if (!context) throw new Error("useAuthModal must be used within AuthModalProvider")
    return context
}