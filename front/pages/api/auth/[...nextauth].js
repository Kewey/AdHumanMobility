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
					placeholder: 'john@doe.com',
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

					const { user } = await res.json()

					if (user) {
						// Any object returned will be saved in `user` property of the JWT
						return user
					} else {
						// If you return null then an error will be displayed advising the user to check their details.
						return null
						// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
					}
				} catch (error) {
					console.log('caught error', error)
					// const errorMessage = e.response.data.message
					// Redirecting to the login page with error message          in the URL
					// throw new Error(errorMessage + '&email=' + credentials.email)
					return null
				}
			},
		}),
	],
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
			session.jwt = token.jwt
			session.id = token.id
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
