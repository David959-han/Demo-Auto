import { readJson } from '@/lib/api/json-store'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const upcoming = searchParams.get('upcoming') === 'true'

  const all = readJson<{ id: string; nextDate: string | null; smsStatus: string }[]>('reminders.json')

  const items = upcoming
    ? all.filter((r) => {
        if (!r.nextDate || r.smsStatus !== 'scheduled') return false
        return new Date(r.nextDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
    : all

  return NextResponse.json({ items })
}
