import { getCsrfToken } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'
import Input from '../components/form/Input'
import Layout from '../components/Layout'

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

function Login({ csrfToken }) {
  return (
    <Layout title="Connexion">
      <div className="max-w-md m-auto p-4">
        <h1 className="text-3xl font-extrabold">Connexion</h1>

        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-3">
            <Input
              label="Adresse mail"
              placeholder="adresse@mail.com"
              name="email"
              type={'email'}
            />
          </div>

          <div className="mb-3">
            <Input
              label="Mot de passe"
              placeholder="******"
              name="password"
              type={'password'}
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
