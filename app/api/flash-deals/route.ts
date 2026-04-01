import { NextResponse } from "next/server"
import { flashDeals } from "@/lib/data"

export async function GET() {
  // Update ends at to always be 4 hours from now for demo purposes
  const updatedDeals = flashDeals.map((deal) => ({
    ...deal,
    endsAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
  }))

  return NextResponse.json({
    deals: updatedDeals,
    total: updatedDeals.length,
  })
}
