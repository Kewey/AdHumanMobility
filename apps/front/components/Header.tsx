import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import Button from './Button'

const Header = ({ searchBar }: any) => {
  const { data: session } = useSession()
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <header className="flex justify-between items-center py-4 px-8 h-20 relative">
      <div className="flex flex-wrap items-center">
        <Link href="/">
          <a className="flex items-center mr-8 font-bold">
            <Image src="/favicon.svg" width="24" height="24" alt="App Name" />
            <span className="ml-1 text-xl">ADMobility</span>
          </a>
        </Link>

        <nav className="lg:flex hidden gap-4 items-center">
          <Link href="/about-us">
            <a>Qui somme nous ?</a>
          </Link>
          <Link href="/objectifs">
            <a>Nos objectifs</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </nav>
      </div>

      <div className="hidden lg:block">{searchBar}</div>

      <div className="lg:flex hidden place-self-center justify-self-end items-center gap-4">
        <Link href="/disruptions/new" passHref>
          <Button
            size="sm"
            data-tip="Vous devez vous connecter pour créer une perturbation"
            onClick={!session ? () => signIn() : null}
          >
            Déclarer une perturbation
          </Button>
        </Link>
        {!session ? (
          <Link href="/api/auth/signin" passHref>
            <Button
              variant="text"
              type="button"
              size="sm"
              onClick={() => signIn()}
            >
              Me connecter
            </Button>
          </Link>
        ) : (
          <Button
            variant="text"
            type="button"
            size="sm"
            onClick={() => {
              signOut()
            }}
          >
            Déconnexion
          </Button>
        )}
      </div>

      <div className="lg:hidden">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setMenuIsOpen((isOpen) => !isOpen)}
        >
          {menuIsOpen ? 'Fermer' : 'Menu'}
        </Button>
      </div>
      {menuIsOpen && (
        <div className="absolute z-[1050] lg:hidden top-full left-0 w-full bg-white p-6">
          <nav className="flex flex-col gap-4">
            {searchBar}
            <Link href="/about-us">
              <a className="px-6 py-2">Qui somme nous ?</a>
            </Link>
            <Link href="/objectifs">
              <a className="px-6 py-2">Nos objectifs</a>
            </Link>
            <Link href="/contact">
              <a className="px-6 py-2">Contact</a>
            </Link>
            <hr />
            <Link href="/disruptions/new" passHref>
              <Button
                data-for="disruption-unauthenticated"
                size="sm"
                textAlign="center"
                disabled={!session}
              >
                Déclarer une perturbation
              </Button>
            </Link>
            {!session ? (
              <Button
                variant="text"
                type="button"
                size="sm"
                onClick={() => signIn()}
              >
                Me connecter
              </Button>
            ) : (
              <Button
                variant="text"
                type="button"
                size="sm"
                onClick={() => {
                  signOut()
                }}
              >
                Déconnexion
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
