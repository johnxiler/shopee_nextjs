"use client"

import { useState, use, Suspense } from "react"
import Image from "next/image"
import useSWR from "swr"
import { Star, MapPin, Truck, Shield, Minus, Plus, ShoppingCart, Heart } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/lib/cart-context"
import { formatPrice, formatSold } from "@/lib/data"
import type { Product } from "@/lib/types"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, isLoading } = useSWR<Product>(`/api/products/${id}`, fetcher)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity)
      window.location.href = "/cart"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex gap-8">
            <Skeleton className="aspect-square w-96 rounded-sm" />
            <div className="flex-1">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="mt-4 h-6 w-32" />
              <Skeleton className="mt-4 h-12 w-48" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-lg text-muted-foreground">Product not found</p>
            <Button className="mt-4" asChild>
              <a href="/products">Browse Products</a>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const images = product.images || [product.image]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-primary">Products</a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Detail Card */}
        <div className="rounded-sm bg-card p-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Images */}
            <div className="w-full lg:w-96">
              <div className="relative aspect-square overflow-hidden rounded-sm border border-border">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="mt-4 flex gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-16 w-16 overflow-hidden rounded-sm border-2 ${selectedImage === index ? "border-primary" : "border-border"
                        }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h1 className="text-xl font-medium text-card-foreground">{product.name}</h1>

              {/* Rating & Sold */}
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">|</span>
                <span className="text-muted-foreground">{formatSold(product.sold)}</span>
              </div>

              {/* Price */}
              <div className="mt-4 rounded-sm bg-muted p-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="rounded bg-primary px-2 py-0.5 text-sm font-semibold text-primary-foreground">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Shipping */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-teal-500" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Shopee Guarantee</span>
                </div>
              </div>

              {/* Location */}
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Ships from {product.location}</span>
              </div>

              {/* Quantity */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Quantity</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={product.stock !== undefined && quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {product.stock && (
                  <span className="text-sm text-muted-foreground">
                    {product.stock} pieces available
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-primary text-primary hover:bg-primary/10"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                </Button>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mt-6 rounded-sm bg-card p-6">
            <h2 className="mb-4 text-lg font-medium text-card-foreground">Product Description</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          </div>
        )}
      </main>
    </div>
  )
}
