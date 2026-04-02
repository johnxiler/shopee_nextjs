"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { Zap, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
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
      <span className="flex h-6 w-7 items-center justify-center rounded bg-foreground text-sm font-bold text-background">
        {String(timeLeft.hours).padStart(2, "0")}
      </span>
      <span className="text-foreground">:</span>
      <span className="flex h-6 w-7 items-center justify-center rounded bg-foreground text-sm font-bold text-background">
        {String(timeLeft.minutes).padStart(2, "0")}
      </span>
      <span className="text-foreground">:</span>
      <span className="flex h-6 w-7 items-center justify-center rounded bg-foreground text-sm font-bold text-background">
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  )
}

function FlashDealCard({ deal }: { deal: FlashDeal }) {
  const soldPercent = Math.round((deal.soldCount / deal.totalStock) * 100)

  return (
    <Link
      href={`/product/${deal.product.id}`}
      className="group flex min-w-[150px] flex-col rounded-sm bg-card p-2 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm">
        <Image
          src={deal.product.image}
          alt={deal.product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 rounded-br bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
          {deal.discountPercent}% OFF
        </div>
      </div>

      <div className="mt-2 text-center">
        <span className="text-lg font-bold text-primary">
          {formatPrice(deal.product.price)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="relative h-4 overflow-hidden rounded-full bg-primary/20">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary to-orange-400"
            style={{ width: `${soldPercent}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white drop-shadow">
              {soldPercent >= 50 ? "SELLING FAST" : `${deal.soldCount} SOLD`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function FlashDeals() {
  const { data, isLoading } = useSWR<{ deals: FlashDeal[] }>("/api/flash-deals", fetcher)
  const endsAt = data?.deals[0]?.endsAt || new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()

  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <div className="rounded-sm bg-card">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-primary">
              <Zap className="h-6 w-6 fill-primary" />
              <span className="text-xl font-bold">FLASH SALE</span>
            </div>
            <CountdownTimer endsAt={endsAt} />
          </div>
          <Link
            href="/flash-deals"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            See All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="min-w-[150px]">
                  <Skeleton className="aspect-square w-full rounded-sm" />
                  <Skeleton className="mt-2 h-6 w-20 mx-auto" />
                  <Skeleton className="mt-2 h-4 w-full rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {data?.deals.map((deal) => (
                <FlashDealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
