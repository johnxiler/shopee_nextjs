"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const mainBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop",
    title: "Payday Sale",
    subtitle: "0% Buy Now, Pay Later",
    link: "/sale/payday",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=300&fit=crop",
    title: "Fashion Week",
    subtitle: "Up to 70% Off",
    link: "/sale/fashion",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&h=300&fit=crop",
    title: "Tech Deals",
    subtitle: "Latest Gadgets on Sale",
    link: "/sale/tech",
  },
]

const sideBanners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=150&fit=crop",
    title: "Pre-Summer Sale",
    subtitle: "Up to 50% Off",
    link: "/sale/summer",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=150&fit=crop",
    title: "New Arrivals",
    subtitle: "Shop Now",
    link: "/new-arrivals",
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mainBanners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + mainBanners.length) % mainBanners.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % mainBanners.length)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <div className="flex gap-2">
        {/* Main Banner Carousel */}
        <div className="relative flex-1 overflow-hidden rounded-sm">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {mainBanners.map((banner) => (
              <Link
                key={banner.id}
                href={banner.link}
                className="relative min-w-full"
              >
                <div className="relative aspect-2.5/1 w-full">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-primary/80 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h2 className="text-3xl font-bold">{banner.title}</h2>
                    <p className="text-lg">{banner.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {mainBanners.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Side Banners */}
        <div className="hidden w-80 flex-col gap-2 lg:flex">
          {sideBanners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="relative overflow-hidden rounded-sm"
            >
              <div className="relative aspect-2.5/1 w-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-sm font-bold">{banner.title}</h3>
                  <p className="text-xs">{banner.subtitle}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
