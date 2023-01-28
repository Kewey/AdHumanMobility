import { getCsrfToken, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, useToaster } from 'react-hot-toast'
import Button from '../components/Button'
import Input from '../components/form/Input'
import Layout from '../components/Layout'

interface AuthenticationFormType {
  email: string
  password: string
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

function Login({ csrfToken }: any) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationFormType>()

  const onSubmit = async ({ email, password }: AuthenticationFormType) => {
    setIsLoading(true)
    try {
      const resData = await signIn<'credentials'>('credentials', {
        email,
        password,
        redirect: false,
      })

      if (resData?.status === 401) {
        toast.error(
          "Cette combinaison adresse mail et mot de passe n'existe pas"
        )
        return
      }

      if (!resData?.ok) {
        throw Error(resData?.error, resData?.url)
      }
      router.push('/')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout title="Connexion">
      <div className="max-w-md m-auto p-4">
        <h1 className="text-3xl text-slate-800 font-extrabold mb-2">
          Connexion
        </h1>

        <p className="text-slate-400 font-medium mb-6">
          Connectez vous à votre compte pour déclarer des perturbations.
        </p>

        <form method="post" onSubmit={handleSubmit(onSubmit)}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-3">
            <Input
              {...register('email', {
                required: 'Vous devez renseigner votre adresse mail',
              })}
              label="Adresse mail"
              placeholder="adresse@mail.com"
              name="email"
              type={'email'}
              error={errors.email}
            />
          </div>

          <Input
            {...register('password', {
              required: 'Vous devez renseigner votre mot de passe',
            })}
            label="Mot de passe"
            placeholder="******"
            name="password"
            type={'password'}
            error={errors.password}
          />

          <div className="mb-3 mt-6">
            <Button type="submit" variant="primary" block disabled={isLoading}>
              {isLoading ? 'Connexion en cours ...' : 'Connexion'}
            </Button>
          </div>
        </form>
        <Link href={'signup'}>
          <Button type="button" variant="text" block>
            Pas encore de compte ? Je m’inscris
          </Button>
        </Link>
      </div>
    </Layout>
  )
}

export default Login
