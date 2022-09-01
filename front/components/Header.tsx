import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
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

  return (
    <header
      className={`grid ${
        showResearch ? 'grid-cols-3' : 'grid-cols-2'
      } py-4 px-8 h-20`}
    >
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
        <div className="w-full max-w-[460px]">
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

      <div className="flex place-self-center justify-self-end items-center gap-4">
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
    </header>
  )
}

export default Header
