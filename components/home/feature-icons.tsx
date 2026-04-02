import Link from "next/link"
import { 
  Percent, 
  Truck, 
  Zap, 
  Tag, 
  Shirt, 
  Sparkles, 
  Award, 
  Coins,
  Heart,
  Gift
} from "lucide-react"

const features = [
  { icon: Percent, label: "Daily Deals", link: "/deals", color: "bg-red-500" },
  { icon: Truck, label: "Free Shipping", link: "/free-shipping", color: "bg-teal-500" },
  { icon: Zap, label: "Flash Deals", link: "/flash-deals", color: "bg-orange-500" },
  { icon: Tag, label: "Vouchers", link: "/vouchers", color: "bg-green-500" },
  { icon: Shirt, label: "Fashion Deals", link: "/category/fashion", color: "bg-purple-500" },
  { icon: Sparkles, label: "Beauty", link: "/category/beauty", color: "bg-pink-500" },
  { icon: Award, label: "Top Picks", link: "/top-picks", color: "bg-yellow-500" },
  { icon: Coins, label: "Coins Rewards", link: "/coins", color: "bg-amber-500" },
  { icon: Heart, label: "Loyalty", link: "/loyalty", color: "bg-rose-500" },
  { icon: Gift, label: "Promos", link: "/promos", color: "bg-indigo-500" },
]

export function FeatureIcons() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-4">
      <div className="rounded-sm bg-card p-4">
        <div className="grid grid-cols-5 gap-4 md:grid-cols-10">
          {features.map((feature) => (
            <Link
              key={feature.label}
              href={feature.link}
              className="flex flex-col items-center gap-2 text-center transition-transform hover:scale-105"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.color} text-white`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-xs text-card-foreground">{feature.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
