import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'

function Signup() {
	const registerUser = async (name) => {
		const data = await fetch('http://localhost:1337/api/auth/local/register', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: 'Michel',
				email: 'yyyy@zzzz.com',
				password: '123456',
			}),
		})

		console.log('data', data)
	}

	return (
		<Layout title='Inscription'>
			<div className='max-w-md m-auto p-4'>
				<Link href='login'>Retour</Link>
				<h1 className='text-3xl font-extrabold mb-4'>Inscription</h1>
				<p className='text-gray-500 mb-5'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
					ipsam architecto sapiente rem at nemo tempore sequi laborum deleniti
					vero repellat corrupti.
				</p>

				<form>
					<div className='mb-3'>
						<Input
							label='Nom'
							placeholder='Dupont'
							name='lastname'
							type='text'
						/>
					</div>

					<div className='mb-3'>
						<Input
							label='Prénom'
							placeholder='Jean'
							name='firstname'
							type='text'
						/>
					</div>

					<div className='mb-3'>
						<Input
							label='Adresse mail'
							placeholder='adresse@mail.com'
							name='email'
							type='email'
						/>
					</div>

					<div className='mb-3'>
						<Input
							label='Mot de passe'
							placeholder='**********'
							name='password'
							type='password'
						/>
					</div>

					<div className='mb-3'>
						<Input
							label='Confirmation de mot de passe'
							placeholder='**********'
							name='confirmPassword'
							type='password'
						/>
					</div>

					<div className='mb-6'>
						<Input
							label='Téléphone'
							placeholder='00 00 00 00 00'
							name='phone'
							type='tel'
						/>
					</div>
				</form>

				<Button type='button' variant='primary' block onClick={registerUser}>
					Inscription
				</Button>
			</div>
		</Layout>
	)
}

export default Signup
