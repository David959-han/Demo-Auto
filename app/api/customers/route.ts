import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const search = (searchParams.get('search') ?? '').toLowerCase()

  const all = readJson<{ id: string; name: string; phone: string; email: string | null; isVip: boolean; createdAt: string }[]>('customers.json')

  const items = search
    ? all.filter((c) => c.name.toLowerCase().includes(search) || c.phone.includes(search))
    : all

  return NextResponse.json({ items, total: items.length })
}
