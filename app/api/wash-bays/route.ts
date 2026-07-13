import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET() {
  const items = readJson('wash-bays.json')
  return NextResponse.json({ items })
}

export async function PATCH() {
  return NextResponse.json({ success: true })
}
