"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MapPin } from "lucide-react"
import { formatPrice, formatSold } from "@/lib/data"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {product.discount && (
          <div className="absolute left-0 top-0 bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-2">
        <h3 className="line-clamp-2 text-sm text-card-foreground">
          {product.name}
        </h3>

        <div className="mt-auto">
          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-semibold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating and Sold */}
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
            </div>
            <span>{formatSold(product.sold)}</span>
          </div>

          {/* Location */}
          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{product.location}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
