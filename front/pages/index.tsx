import type { NextApiRequest, NextPage } from 'next'
import Link from 'next/link'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Input from '../components/form/Input'
import { getDisturbances } from './api/disturbances'
import { StrapiEntity } from '../types/api'
import { Disturbance as DisturbanceType } from '../types/disturbance'
import { useContextualRouting } from 'next-use-contextual-routing'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import { Disturbance } from '../components/Disturbance'
import { useForm } from 'react-hook-form'

Modal.setAppElement('#__next')

export const getServerSideProps = async () => {
  const res = await getDisturbances()
  const disturbances = await res.json()

  console.log('disturbances', disturbances)

  return {
    props: {
      disturbances,
    },
  }
}

interface HomePageProps {
  posts: StrapiEntity<DisturbanceType[]>
}

const Home: NextPage = ({ posts }: HomePageProps) => {
  const { data: session } = useSession()
  const { makeContextualHref, returnHref } = useContextualRouting()
  const router = useRouter()

  console.log('posts', posts)

  const { register, handleSubmit } = useForm<{ search: string }>({})

  const signInButtonNode = () => {
    if (session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signin">
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
        <Link href="/api/auth/signout">
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

  return (
    <>
      <Modal
        isOpen={!!router.query.slug}
        onRequestClose={() => router.push('/')}
        contentLabel="Post modal"
        className="absolute top-8 bottom-8 left-0 right-0 max-w-lg bg-white mx-auto overflow-y-auto"
      >
        <Disturbance disturbance={posts?.[0]?.attributes} />
      </Modal>

      <div className="hero">
        <Head>
          <title>Bienvenue</title>
        </Head>
        <div className="absolute right-4 top-4">
          Menu
          {signOutButtonNode()}
          {signInButtonNode()}
        </div>

        <div className="grid grid-cols-[360px_1fr]">
          <aside className="p-4 h-screen overflow-y-auto">
            <h1>Bienvenue {session?.user?.name} !</h1>
            {session && (
              <Link href={'disturbances/new'}>
                <Button block>Ajouter un incident</Button>
              </Link>
            )}
            <div className="mt-4">
              <Input
                register={register}
                placeholder="Rechercher un incident, une ville, ..."
                type="search"
                name="search"
                id="search"
              />
            </div>
            <div className="mt-4">
              {posts?.map(
                ({
                  attributes: {
                    title,
                    type,
                    car_type,
                    status,
                    slug,
                    thumbnail,
                  },
                }: StrapiEntity<DisturbanceType>) => (
                  <Link
                    key={slug}
                    as={`disturbances/${slug}`}
                    href={makeContextualHref({ slug })}
                    shallow
                  >
                    <article>
                      {thumbnail && (
                        <img
                          src={thumbnail.attributes.url}
                          alt="test"
                          height={175}
                          width={'100%'}
                          className="border-8"
                        />
                      )}
                      <div className="flex justify-between mt-3">
                        <div className="grid grid-flow-col gap-2">
                          <Badge>{type}</Badge>
                          <Badge>{car_type}</Badge>
                        </div>

                        <Badge>{status}</Badge>
                      </div>
                      <h3 className="mt-2">{title}</h3>
                    </article>
                  </Link>
                )
              )}
            </div>
          </aside>
          <main className="bg-slate-100">
            <p>Map</p>
          </main>
        </div>
      </div>
    </>
  )
}

export default Home
