import { GoogleMap } from '@react-google-maps/api'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { MutableRefObject, Ref } from 'react'
import Button from './Button'
import { SearchInput } from './form/Search'
import { SearchPlace } from './form/SearchPlace'

interface HeaderProps<T> {
  options: T[]
  selectedValue: string
  displayedProperty: string
  query: string
  disabled: boolean
  placeholder: string
  setQuery: (value: string) => void
  handleSelectedOption: (value: any) => void
}

const Header = ({
  options,
  query,
  selectedValue,
  displayedProperty,
  disabled,
  placeholder,
  setQuery,
  handleSelectedOption,
}: HeaderProps<any>) => {
  const { data: session } = useSession()

  return (
    <header className="grid grid-cols-3 py-4 px-8 h-20">
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

      <div className="w-full max-w-[460px]">
        <SearchInput
          options={options}
          query={query}
          selectedValue={selectedValue}
          setQuery={setQuery}
          placeholder={placeholder}
          disabled={disabled}
          displayedProperty={displayedProperty}
          handleSelectedOption={handleSelectedOption}
        />
      </div>

      <div className="flex place-self-center justify-self-end items-center gap-4">
        {!session ? (
          <>
            <Link href="disturbances/new">
              <Button size="sm">Déclarer ...</Button>
            </Link>
            <Link href="/api/auth/signin">
              <Button
                variant="text"
                type="button"
                size="sm"
                onClick={() => signIn()}
              >
                Me connecter
              </Button>
            </Link>
            <Link href="/signup">
              <Button type="button" size="sm">
                M'inscrire
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="disturbances/new">
              <Button size="sm">Déclarer un incident ou une pertubation</Button>
            </Link>
            <button
              onClick={() => {
                signOut()
              }}
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
