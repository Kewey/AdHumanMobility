import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Adresse mail',
          type: 'mail',
        },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
            {
              method: 'POST',
              body: JSON.stringify({
                identifier: credentials.email.toLowerCase(),
                password: credentials.password,
              }),
              headers: { 'Content-Type': 'application/json' },
            }
          )

          const { user, jwt } = await res.json()

          if (user) {
            return { ...user, jwt }
          } else {
            return null
          }
        } catch (error) {
          console.log('caught error', error)
          return null
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt
        token.id = user.id
        token.name = user.username
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      session.id = token.id
      session.jwt = token.jwt
      return session
    },
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth
