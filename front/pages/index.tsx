import type { NextApiRequest, NextPage } from 'next'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
	const session = await getSession({ req })

	// let headers = {}
	// if (session) {
	//   headers = {Authorization: `Bearer ${session.jwt}`};
	// }

	return {
		props: {
			session,
		},
	}
}

const Home: NextPage = () => {
	const { data: session, status } = useSession()
	console.log('session', session)
	console.log('status', status)

	const signInButtonNode = () => {
		if (session) {
			return false
		}

		return (
			<div>
				<Link href='/api/auth/signin'>
					<Button
						onClick={(e) => {
							e.preventDefault()
							signIn()
						}}
					>
						Sign In
					</Button>
				</Link>
			</div>
		)
	}

	const signOutButtonNode = () => {
		if (!session) {
			return false
		}

		return (
			<div>
				<Link href='/api/auth/signout'>
					<button
						onClick={(e) => {
							e.preventDefault()
							signOut()
						}}
					>
						Sign Out
					</button>
				</Link>
			</div>
		)
	}

	if (!session) {
		return (
			<div className='hero'>
				<div className='navbar'>
					{signOutButtonNode()}
					{signInButtonNode()}
				</div>
				<div className='text'>You aren't authorized to view this page</div>
			</div>
		)
	}

	return (
		<div className='hero'>
			<Head>
				<title>Bienvenue</title>
			</Head>
			<div className='navbar'>
				{signOutButtonNode()}
				{signInButtonNode()}
			</div>
			<h1>Bienvenue {session?.user?.name} !</h1>
		</div>
	)
}

export default Home
