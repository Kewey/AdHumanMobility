import axios from "axios"
import { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Adresse mail",
          type: "email",
        },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials, req) {
        const { data } = await axios.post(
          `/signin`,
          JSON.stringify(credentials),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "",
            },
          }
        )

        axios.defaults.headers["Authorization"] = `Bearer ${data.token}`
        return data
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      // @ts-ignore
      session = { ...session, ...token }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
}
