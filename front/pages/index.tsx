import type { NextApiRequest, NextPage } from 'next';
import Link from 'next/link';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Input from '../components/Input';

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const session = await getSession({ req });

  let headers = {};
  if (session) {
    headers = { Authorization: `Bearer ${session.jwt}` };
  }

  return {
    props: {
      session,
    },
  };
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  console.log('session', session);
  console.log('status', status);

  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <Button
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Sign In
          </Button>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  };

  return (
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
          <Link href={'new-disturbance'}>
            <Button block>Ajouter un incident</Button>
          </Link>
          <div className="mt-4">
            <Input
              placeholder="Rechercher un incident, une ville, ..."
              type="search"
              name="search"
              id="search"
            />
          </div>
          <div className="mt-4">
            {[1, 1, 1, 1, 1, 1, 1, 1].map(() => (
              <Link href={''}>
                <article>
                  <img
                    src=""
                    alt="test"
                    height={175}
                    width={'100%'}
                    className="border-8 block"
                  />
                  <div className="flex justify-between mt-3">
                    <div className="grid grid-flow-col gap-2">
                      <Badge>Badge</Badge>
                      <Badge>Badge</Badge>
                    </div>

                    <Badge>En cours</Badge>
                  </div>
                  <h3 className="mt-2">Titre de l'incident</h3>
                </article>
              </Link>
            ))}
          </div>
        </aside>
        <main>
          <p>Test</p>
        </main>
      </div>
    </div>
  );
};

export default Home;
