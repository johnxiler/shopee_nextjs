export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  images?: string[]
  category: string
  categoryId: string
  rating: number
  sold: number
  location: string
  description?: string
  stock?: number
  isFlashDeal?: boolean
  flashDealEndsAt?: string
}

export interface Category {
  id: string
  name: string
  image: string
  slug: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface FlashDeal {
  id: string
  product: Product
  discountPercent: number
  soldCount: number
  totalStock: number
  endsAt: string
}

export interface Banner {
  id: string
  image: string
  title: string
  link: string
}

export interface FeatureIcon {
  id: string
  icon: string
  label: string
  link: string
}
