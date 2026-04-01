"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import { Header } from "@/components/layout/header"
import { ProductCard } from "@/components/product/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product, Category } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function ProductsContent() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  
  const apiUrl = `/api/products?${new URLSearchParams({
    ...(search && { search }),
    ...(category && { category }),
  }).toString()}`

  const { data: productsData, isLoading: productsLoading } = useSWR<{ products: Product[] }>(apiUrl, fetcher)
  const { data: categoriesData } = useSWR<{ categories: Category[] }>("/api/categories", fetcher)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="text-foreground">
            {category ? categoriesData?.categories.find(c => c.slug === category)?.name || "Products" : search ? `Search: "${search}"` : "All Products"}
          </span>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="rounded-sm bg-card p-4">
              <h3 className="mb-4 font-semibold text-card-foreground">Categories</h3>
              <div className="flex flex-col gap-2">
                <Button
                  variant={!category ? "default" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <a href="/products">All Products</a>
                </Button>
                {categoriesData?.categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={category === cat.slug ? "default" : "ghost"}
                    className="justify-start"
                    asChild
                  >
                    <a href={`/products?category=${cat.slug}`}>{cat.name}</a>
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="mb-4 flex items-center justify-between rounded-sm bg-card p-3">
              <span className="text-sm text-muted-foreground">
                {productsData?.products.length || 0} products found
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select defaultValue="popular">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            {productsLoading ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <Skeleton className="aspect-square w-full rounded-sm" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : productsData?.products.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-sm bg-card py-16">
                <p className="text-lg text-muted-foreground">No products found</p>
                <Button className="mt-4" asChild>
                  <a href="/products">View all products</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {productsData?.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <div className="h-32 bg-primary" />
        <div className="mx-auto max-w-7xl px-4 py-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
