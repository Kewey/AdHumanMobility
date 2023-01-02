import { getCsrfToken, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
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
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthenticationFormType>()

  const onSubmit = async ({ email, password }: AuthenticationFormType) => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      }).then(({ ok, error }: any) => {
        if (!ok) {
          throw new Error(error)
        }

        router.push('/')
      })
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <Layout title="Connexion">
      <div className="max-w-md m-auto p-4">
        <h1 className="text-3xl font-extrabold">Connexion</h1>

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

          <div className="mb-3">
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
          </div>

          <div className="mb-3">
            <Button type="submit" variant="primary" block>
              Connexion
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
