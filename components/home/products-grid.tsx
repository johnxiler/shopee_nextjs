"use client"

import useSWR from "swr"
import { ProductCard } from "@/components/product/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Product } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function ProductsGrid() {
  const { data, isLoading } = useSWR<{ products: Product[] }>("/api/products", fetcher)

  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <div className="rounded-sm bg-card">
        <div className="border-b border-border p-4">
          <h2 className="text-center text-base font-medium text-primary">
            DAILY DISCOVER
          </h2>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Skeleton className="aspect-square w-full rounded-sm" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {data?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
