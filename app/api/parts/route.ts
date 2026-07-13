import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const lowStock = searchParams.get('lowStock') === 'true'

  const all = readJson<{ id: string; quantity: number; minThreshold: number }[]>('parts.json')
  const items = lowStock ? all.filter((p) => p.quantity <= p.minThreshold) : all

  return NextResponse.json({ items })
}
