import { Suspense } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={null}>
                <Header />
            </Suspense>
            <main className="mx-auto max-w-7xl px-4 py-16">
                <div className="flex flex-col items-center justify-center rounded-sm bg-card py-16">
                    <h1 className="text-6xl font-bold text-primary">404</h1>
                    <h2 className="mt-4 text-xl font-medium">Page Not Found</h2>
                    <p className="mt-2 text-muted-foreground">
                        The page you are looking for does not exist.
                    </p>
                    <Button className="mt-6" asChild>
                        <Link href="/">Go Home</Link>
                    </Button>
                </div>
            </main>
        </div>
    )
}