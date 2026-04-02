"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthModal } from "@/lib/auth-modal-context"
import { Search, ShoppingCart, Bell, HelpCircle, Globe } from "lucide-react"
import { FaFacebook, FaInstagram } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

const trendingSearches = [
  "Baggy Pants",
  "Wireless Earbuds",
  "Phone Cases",
  "Skincare Set",
  "Sandals For Women",
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const { getCartCount } = useCart()
  const router = useRouter()
  const cartCount = getCartCount()
  const { openModal } = useAuthModal()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Updated handlers using query params
  const handleLoginClick = () => {
    router.push("/?auth=login", { scroll: false })
  }

  const handleSignupClick = () => {
    router.push("/?auth=signup", { scroll: false })
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between py-1 text-xs">
            <div className="flex items-center gap-4">
              <Link href="/seller" className="hover:opacity-80">Seller Centre</Link>
              <Link href="/sell" className="hover:opacity-80">Start Selling</Link>
              <Link href="/download" className="hover:opacity-80">Download</Link>
              <div className="flex items-center gap-2">
                <span>Follow us on</span>
                <Link href="#" className="hover:opacity-80"><FaFacebook className="h-4 w-4" /></Link>
                <Link href="#" className="hover:opacity-80"><FaInstagram className="h-4 w-4" /></Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/notifications" className="flex items-center gap-1 hover:opacity-80">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Link>
              <Link href="/help" className="flex items-center gap-1 hover:opacity-80">
                <HelpCircle className="h-4 w-4" />
                <span>Help</span>
              </Link>
              <button className="flex items-center gap-1 hover:opacity-80">
                <Globe className="h-4 w-4" />
                <span>English</span>
              </button>

              {/* Updated Sign Up & Login buttons */}
              <button
                onClick={handleSignupClick}
                className="hover:opacity-80 font-medium"
              >
                Sign Up
              </button>
              <button
                onClick={handleLoginClick}
                className="hover:opacity-80 font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary text-primary-foreground pb-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-8 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-white text-primary">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <span>Shopee</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="flex">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Sign up and get 100% off on your first order"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 rounded-r-none border-0 bg-white text-foreground pr-4 placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-10 rounded-l-none bg-primary-foreground px-6 text-primary hover:bg-primary-foreground/90"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </form>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-8 w-8" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Trending Searches */}
          <div className="flex gap-4 text-xs">
            {trendingSearches.map((term) => (
              <Link
                key={term}
                href={`/products?search=${encodeURIComponent(term)}`}
                className="hover:underline"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}