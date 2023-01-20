import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Button from '../components/Button'
import Input from '../components/form/Input'
import Layout from '../components/Layout'

interface UserForm {
  lastname: string
  firstname: string
  email: string
  password: string
  confirmPassword: string
  phone: string
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

function Signup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserForm>()

  const password = useRef({})
  password.current = watch('password', '')

  const registerUser = async (data: UserForm) => {
    const body = {
      ...data,
      username: `${data.firstname} ${data.lastname}`,
    }

    setIsLoading(true)
    try {
      const { data: newUser } = await axios.post(`/signup`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      toast.success('Votre compte a bien était crée !')
      router.back()
    } catch (error: any) {
      console.log(error)

      toast.error(error.message)
      return
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout title="Inscription">
      <div className="max-w-md m-auto p-4">
        <div className="mb-3">
          <Button
            variant="text"
            type="button"
            size="sm"
            onClick={() => router.back()}
          >
            Retour
          </Button>
        </div>
        <h1 className="text-3xl font-extrabold mb-4">Inscription</h1>
        <p className="text-gray-500 mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          ipsam architecto sapiente rem at nemo tempore sequi laborum deleniti
          vero repellat corrupti.
        </p>

        <form onSubmit={handleSubmit(registerUser)}>
          <div className="mb-3">
            <Input
              {...register('lastname', {
                required: 'Vous devez renseigner votre nom',
                minLength: 3,
              })}
              label="Nom"
              placeholder="Dupont"
              type="text"
              error={errors.lastname}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register('firstname', {
                required: 'Vous devez renseigner votre prénom',
                minLength: 3,
              })}
              label="Prénom"
              placeholder="Jean"
              type="text"
              error={errors.firstname}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register('email', {
                required: 'Vous devez renseigner une adresse mail.',
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Ceci ne ressemble pas à une adresse mail.',
                },
              })}
              label="Adresse mail"
              placeholder="adresse@mail.com"
              type="email"
              error={errors.email}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register('password', {
                required: 'Vous devez renseigner votre mot de passe.',
                minLength: {
                  value: 8,
                  message:
                    'Votre mot de passe doit avoir au moins 8 caractères.',
                },
              })}
              label="Mot de passe"
              placeholder="**********"
              type="password"
              error={errors.password}
            />
          </div>

          <div className="mb-3">
            <Input
              {...register('confirmPassword', {
                validate: (value) =>
                  value === password.current ||
                  'Les mots de passe ne sont pas identiques',
              })}
              label="Confirmation de mot de passe"
              placeholder="**********"
              type="password"
              error={errors.confirmPassword}
            />
          </div>

          <div className="mb-6">
            <Input
              {...register('phone', {
                required: 'Vous devez renseigner votre numéro de téléphone',
                pattern: {
                  value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gim,
                  message: 'Ceci ne ressemble pas à un numéro de téléphone',
                },
              })}
              label="Téléphone"
              placeholder="00 00 00 00 00"
              type="tel"
              error={errors.phone}
            />
          </div>

          <Button type="submit" variant="primary" block disabled={isLoading}>
            {isLoading ? <span>...</span> : 'Inscription'}
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export default Signup
