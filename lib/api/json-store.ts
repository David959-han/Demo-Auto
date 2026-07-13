import path from 'path'
import fs from 'fs'

const DATA_DIR = path.join(process.cwd(), 'data')

export function readJson<T>(filename: string): T {
  const file = path.join(DATA_DIR, filename)
  const raw = fs.readFileSync(file, 'utf-8')
  return JSON.parse(raw) as T
}
