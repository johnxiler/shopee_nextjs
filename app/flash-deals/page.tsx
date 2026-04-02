"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { Zap, ShoppingCart } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/data"
import type { FlashDeal } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function CountdownTimer({ endsAt }: { endsAt: string }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const end = new Date(endsAt).getTime()
      const diff = end - now

      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTime())
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000)
    return () => clearInterval(timer)
  }, [endsAt])

  return (
    <div className="flex items-center gap-1">
      <span className="flex h-8 w-10 items-center justify-center rounded bg-foreground text-lg font-bold text-background">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>
      <span className="text-xl font-bold text-foreground">:</span>
      <span className="flex h-8 w-10 items-center justify-center rounded bg-foreground text-lg font-bold text-background">
        {String(timeLeft.minutes).padStart(2, "0")}
      </span>
      <span className="text-xl font-bold text-foreground">:</span>
      <span className="flex h-8 w-10 items-center justify-center rounded bg-foreground text-lg font-bold text-background">
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  )
}

function FlashDealCard({ deal }: { deal: FlashDeal }) {
  const { addToCart } = useCart()
  const soldPercent = Math.round((deal.soldCount / deal.totalStock) * 100)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(deal.product, 1)
  }

  return (
    <Link
      href={`/product/${deal.product.id}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={deal.product.image}
          alt={deal.product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">
          {deal.discountPercent}% OFF
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm text-card-foreground">
          {deal.product.name}
        </h3>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(deal.product.price)}
          </span>
          {deal.product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(deal.product.originalPrice)}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="relative h-5 overflow-hidden rounded-full bg-primary/20">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary to-orange-400 transition-all"
              style={{ width: `${soldPercent}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-white drop-shadow">
                {soldPercent >= 80 ? "ALMOST GONE!" : soldPercent >= 50 ? "SELLING FAST" : `${deal.soldCount} SOLD`}
              </span>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="mt-4 w-full"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Link>
  )
}

export default function FlashDealsPage() {
  const { data, isLoading } = useSWR<{ deals: FlashDeal[] }>("/api/flash-deals", fetcher)
  const endsAt = data?.deals[0]?.endsAt || new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 rounded-sm bg-linear-to-r from-primary to-orange-500 p-6 text-white sm:flex-row">
          <div className="flex items-center gap-3">
            <Zap className="h-10 w-10 fill-white" />
            <div>
              <h1 className="text-3xl font-bold">FLASH SALE</h1>
              <p className="text-white/80">Limited time offers - Grab them before they are gone!</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm text-white/80">Ends in</span>
            <CountdownTimer endsAt={endsAt} />
          </div>
        </div>

        {/* Deals Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-square w-full rounded-sm" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-5 w-full rounded-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data?.deals.map((deal) => (
              <FlashDealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
