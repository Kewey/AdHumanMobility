import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='fr'>
			<Head>
				<link
					rel='preload'
					href='/fonts/RobotoFlex-Regular.ttf'
					as='font'
					type='font/ttf'
					crossOrigin='anonymous'
				/>
			</Head>
			<body className='font-sans font-light'>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
