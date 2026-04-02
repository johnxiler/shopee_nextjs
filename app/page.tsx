import { Header } from "@/components/layout/header"
import { HeroBanner } from "@/components/home/hero-banner"
import { FeatureIcons } from "@/components/home/feature-icons"
import { FlashDeals } from "@/components/home/flash-deals"
import { CategoriesSection } from "@/components/home/categories-section"
import { ProductsGrid } from "@/components/home/products-grid"
import { Suspense } from "react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main>
        <HeroBanner />
        <FeatureIcons />
        <FlashDeals />
        <CategoriesSection />
        <ProductsGrid />
      </main>
      <footer className="mt-8 border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>2026 Shopee Clone. All rights reserved.</p>
          <p className="mt-2">Built with Next.js, Tailwind CSS, and REST APIs</p>
        </div>
      </footer>
    </div>
  )
}
