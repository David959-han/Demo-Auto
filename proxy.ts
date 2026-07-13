import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const PROTECTED_PATHS = ['/dashboard']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const localeMatch = pathname.match(/^\/(uz|en|ar)(\/.*)?$/)
  const localePath = localeMatch?.[2] ?? '/'

  const isProtected = PROTECTED_PATHS.some((p) => localePath.startsWith(p))

  if (isProtected && !req.auth?.user) {
    const locale = localeMatch?.[1] ?? 'en'
    return NextResponse.redirect(new URL(`/${locale}/auth`, req.url))
  }

  return intlMiddleware(req as Parameters<typeof intlMiddleware>[0])
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|otf)).*)'],
}
