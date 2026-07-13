import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import path from 'path'
import fs from 'fs'

interface DemoUser {
  id: string
  email: string
  password: string
  name: string
  role: string
  tenantId: string
  tenantSlug: string
}

function getUsers(): DemoUser[] {
  const file = path.join(process.cwd(), 'data', 'users.json')
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as DemoUser[]
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/en/auth' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const users = getUsers()
        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        )
        if (!user) return null

        return {
          id:         user.id,
          email:      user.email,
          name:       user.name,
          role:       user.role,
          tenantId:   user.tenantId,
          tenantSlug: user.tenantSlug,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id         = user.id
        token.role       = (user as { role?: string }).role
        token.tenantId   = (user as { tenantId?: string }).tenantId
        token.tenantSlug = (user as { tenantSlug?: string }).tenantSlug
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id         = token.id as string
        session.user.role       = token.role as string
        session.user.tenantId   = token.tenantId as string
        session.user.tenantSlug = token.tenantSlug as string
      }
      return session
    },
  },
})
