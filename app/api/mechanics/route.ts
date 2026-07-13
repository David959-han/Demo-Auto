import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET() {
  const items = readJson('mechanics.json')
  return NextResponse.json({ items })
}
