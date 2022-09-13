import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Button from './Button'
import { SearchGoogleMap } from './form/SearchGoogleMap'

interface HeaderProps<T> {
  options: T[]
  selectedValue: string
  query: string
  disabled: boolean
  setQuery: (value: string) => void
  handleSelectedOption: (value: any) => void
  showResearch?: boolean
}

const Header = ({
  options,
  query,
  selectedValue,
  disabled,
  setQuery,
  handleSelectedOption,
  showResearch,
}: HeaderProps<any>) => {
  const { data: session } = useSession()
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <header className="flex justify-between items-center py-4 px-8 h-20 relative">
      <div className="flex flex-wrap items-center">
        <Link href="/">
          <a className="block mr-5 font-bold">Logo | Name</a>
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

      {showResearch && (
        <div className="lg:block hidden w-full max-w-[460px]">
          <SearchGoogleMap
            options={options}
            query={query}
            selectedValue={selectedValue}
            setQuery={setQuery}
            disabled={disabled}
            handleSelectedOption={handleSelectedOption}
          />
        </div>
      )}

      <div className="lg:flex hidden place-self-center justify-self-end items-center gap-4">
        <Link href="/disturbances/new" passHref>
          <Button size="sm">Déclarer une perturbation</Button>
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
        <div className="absolute z-50 top-full left-0 w-full bg-white p-6">
          <nav className="flex flex-col gap-4">
            <Link href="/about-us">
              <a>Qui somme nous ?</a>
            </Link>
            <Link href="/objectifs">
              <a>Nos objectifs</a>
            </Link>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
            <hr />
            <Link href="/disturbances/new" passHref>
              <Button size="sm" textAlign="center">
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
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
