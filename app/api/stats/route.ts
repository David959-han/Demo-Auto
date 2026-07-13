import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET() {
  const stats = readJson('stats.json')
  return NextResponse.json(stats)
}
