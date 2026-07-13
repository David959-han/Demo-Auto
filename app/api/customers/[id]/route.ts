import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const all = readJson<{ id: string }[]>('customers.json')
  const item = all.find((c) => c.id === id)
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(item)
}
