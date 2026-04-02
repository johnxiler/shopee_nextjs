"use client"

import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/data"
import { Suspense } from "react"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <main className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex flex-col items-center justify-center rounded-sm bg-card py-16">
            <ShoppingCart className="h-24 w-24 text-muted-foreground/50" />
            <h2 className="mt-4 text-xl font-medium text-card-foreground">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Start shopping to add items to your cart</p>
            <Button className="mt-6" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-2xl font-medium text-foreground">Shopping Cart</h1>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Header */}
            <div className="hidden rounded-t-sm bg-card p-4 lg:flex">
              <div className="flex flex-1 items-center gap-4">
                <Checkbox id="select-all" />
                <span className="text-sm text-muted-foreground">Product</span>
              </div>
              <div className="w-28 text-center text-sm text-muted-foreground">Unit Price</div>
              <div className="w-32 text-center text-sm text-muted-foreground">Quantity</div>
              <div className="w-28 text-center text-sm text-muted-foreground">Total Price</div>
              <div className="w-20 text-center text-sm text-muted-foreground">Actions</div>
            </div>

            {/* Items */}
            <div className="divide-y divide-border rounded-b-sm bg-card">
              {items.map((item) => (
                <div key={item.product.id} className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center">
                  {/* Product Info */}
                  <div className="flex flex-1 items-center gap-4">
                    <Checkbox />
                    <Link href={`/product/${item.product.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-border">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/product/${item.product.id}`} className="line-clamp-2 text-sm hover:text-primary">
                        {item.product.name}
                      </Link>
                      {item.product.discount && (
                        <span className="mt-1 inline-block rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          {item.product.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="flex items-center justify-between lg:w-28 lg:justify-center">
                    <span className="text-sm text-muted-foreground lg:hidden">Unit Price:</span>
                    <div className="flex flex-col items-end lg:items-center">
                      {item.product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(item.product.originalPrice)}
                        </span>
                      )}
                      <span className="text-sm">{formatPrice(item.product.price)}</span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between lg:w-32 lg:justify-center">
                    <span className="text-sm text-muted-foreground lg:hidden">Quantity:</span>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="flex items-center justify-between lg:w-28 lg:justify-center">
                    <span className="text-sm text-muted-foreground lg:hidden">Total:</span>
                    <span className="font-medium text-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end lg:w-20 lg:justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80">
            <div className="sticky top-32 rounded-sm bg-card p-6">
              <h2 className="mb-4 text-lg font-medium text-card-foreground">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="text-xl font-bold text-primary">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>

              <Button className="mt-6 w-full" size="lg">
                Checkout ({items.length})
              </Button>

              <Button
                variant="outline"
                className="mt-3 w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
