import axios from 'axios'
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
          const fetchAuth = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/signin`,
            {
              method: 'POST',
              body: JSON.stringify(credentials),
              headers: {
                'Content-Type': 'application/json',
                Authorization: null,
              },
            }
          )

          const { token } = await fetchAuth.json()

          return token
        } catch (error) {
          console.log('CredentialsProvider', error)
          return null
        }
      },
    }),
  ],
  session: {
    jwt: true,
    strategy: 'jwt',
  },
  callbacks: {
    jwt(token) {
      return { token }
    },
    async session({ session, token, user }) {
      console.log('{ session, token, user }', { session, token, user })

      axios.defaults.headers.common['Authorization'] = null

      session.accessToken = token.accessToken

      session.id = token.id
      session.userId = user?.userId
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
