"use client"

import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { Skeleton } from "@/components/ui/skeleton"
import type { Category } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function CategoriesSection() {
  const { data, isLoading } = useSWR<{ categories: Category[] }>("/api/categories", fetcher)

  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <div className="rounded-sm bg-card">
        <div className="border-b border-border p-4">
          <h2 className="text-base font-medium text-card-foreground">CATEGORIES</h2>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="grid grid-cols-5 gap-4 md:grid-cols-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-20 w-20 rounded-sm" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-4 md:grid-cols-10">
              {data?.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="flex flex-col items-center gap-2 transition-transform hover:scale-105"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-sm border border-border bg-muted">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-center text-xs text-card-foreground line-clamp-2">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
