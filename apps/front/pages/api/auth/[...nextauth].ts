import axios from 'axios'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshAccessToken(token: JWT) {
  try {
    const { data } = await axios.post(
      `/token/refresh`,
      { refreshToken: token.refreshToken },
      {}
    )

    return data
  } catch (error) {
    return token
  }
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Adresse mail',
          type: 'email',
        },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const { data } = await axios.post(
            `/signin`,
            JSON.stringify(credentials),
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: '',
              },
            }
          )

          // @ts-ignore
          axios.defaults.headers['Authorization'] = `Bearer ${data.token}`
          return data
        } catch (error) {
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        }
      }

      return refreshAccessToken(token)
    },

    async session({ session, token }) {
      // @ts-ignore
      session.user.token = token.token
      // @ts-ignore
      session.user.id = token.id
      // @ts-ignore
      session.user.username = token.username
      return session
    },
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup',
  },
}

export default NextAuth(options)
