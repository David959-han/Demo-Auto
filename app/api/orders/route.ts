import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? ''

  const all = readJson<{ id: string; status: string }[]>('orders.json')
  const items = status ? all.filter((o) => o.status === status) : all

  return NextResponse.json({ items, total: items.length })
}
