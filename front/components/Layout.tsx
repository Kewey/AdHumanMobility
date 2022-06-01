import Head from 'next/head'
import React, { ReactElement } from 'react'

interface LayoutProps {
	title: string
	children: ReactElement
}

function Layout({ title, children }: LayoutProps) {
	return (
		<>
			<Head>
				<title>{title} | APP</title>
			</Head>

			<main className='min-h-screen'>{children}</main>
		</>
	)
}

export default Layout
