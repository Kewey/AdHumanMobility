import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'

function Signup() {
	const registerUser = async (event) => {
		event.preventDefault()

		const fields = Array.prototype.slice
			.call(event.target)
			.filter((el) => el.name)
			.reduce(
				(form, el) => ({
					...form,
					[el.name]: el.value,
				}),
				{}
			)

		const body = {
			...fields,
			username: `${fields.firstname} ${fields.lastname}`,
		}

		await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
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

				<form onSubmit={registerUser}>
					<div className='mb-3'>
						<Input
							required
							label='Nom'
							placeholder='Dupont'
							name='lastname'
							type='text'
						/>
					</div>

					<div className='mb-3'>
						<Input
							required
							label='Prénom'
							placeholder='Jean'
							name='firstname'
							type='text'
						/>
					</div>

					<div className='mb-3'>
						<Input
							required
							label='Adresse mail'
							placeholder='adresse@mail.com'
							name='email'
							type='email'
						/>
					</div>

					<div className='mb-3'>
						<Input
							required
							label='Mot de passe'
							placeholder='**********'
							name='password'
							type='password'
						/>
					</div>

					<div className='mb-3'>
						<Input
							required
							label='Confirmation de mot de passe'
							placeholder='**********'
							name='confirmPassword'
							type='password'
						/>
					</div>

					<div className='mb-6'>
						<Input
							required
							label='Téléphone'
							placeholder='00 00 00 00 00'
							name='phone'
							type='tel'
						/>
					</div>

					<Button type='submit' variant='primary' block>
						Inscription
					</Button>
				</form>
			</div>
		</Layout>
	)
}

export default Signup
