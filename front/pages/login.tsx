import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'

function Login() {
	return (
		<Layout title='Connexion'>
			<div className='max-w-md m-auto p-4'>
				<h1 className='text-3xl font-extrabold'>Connexion</h1>

				<form action=''>
					<div className='mb-3'>
						<Input
							label='Adresse mail'
							placeholder='adresse@mail.com'
							name='email'
							type={'email'}
						/>
					</div>

					<div className='mb-3'>
						<Input
							label='Mot de passe'
							placeholder='******'
							name='password'
							type={'password'}
						/>
					</div>
				</form>

				<div className='mb-3'>
					<Button type='button' variant='primary' block>
						Connexion
					</Button>
				</div>

				<Link href={'signup'}>
					<Button type='button' variant='text' block>
						Pas encore de compte ? Je m’inscris
					</Button>
				</Link>
			</div>
		</Layout>
	)
}

export default Login
