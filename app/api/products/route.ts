import { NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/data"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const limit = searchParams.get("limit")
  const sortBy = searchParams.get("sortBy")

  let filteredProducts = [...products]

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === category || p.category.toLowerCase().includes(category.toLowerCase())
    )
  }

  // Filter by search query
  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
    )
  }

  // Sort products
  if (sortBy) {
    switch (sortBy) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "sold":
        filteredProducts.sort((a, b) => b.sold - a.sold)
        break
      default:
        break
    }
  }

  // Limit results
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit))
  }

  return NextResponse.json({
    products: filteredProducts,
    total: filteredProducts.length,
  })
}
