import { GoogleMap } from '@react-google-maps/api'
import Head from 'next/head'
import React, { forwardRef, ReactElement, useState } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import Header from './Header'

interface LayoutProps {
  title: string
  description: string
  children: ReactElement
  sidebar?: ReactElement
  callback?: (lat: number, lng: number) => void
}

const Layout = ({
  title,
  description,
  children,
  sidebar,
  callback,
}: LayoutProps) => {
  const [query, setQuery] = useState('')

  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelectedOption = async (selectedOption: string) => {
    if (!callback) return

    setValue(selectedOption, false)
    clearSuggestions()

    const res = await getGeocode({ address: selectedOption })
    const { lat, lng } = await getLatLng(res[0])
    callback(lat, lng)
  }

  return (
    <>
      <Head>
        <title>{title} | APP</title>
        <meta name="description" content={description} />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header
          selectedValue={value}
          disabled={!ready}
          setQuery={setQuery}
          options={data}
          query={query}
          placeholder={'Rechercher une ville, rue, ...'}
          displayedProperty={''}
          handleSelectedOption={handleSelectedOption}
        />

        {sidebar ? (
          <div className="grid lg:grid-cols-[400px_1fr] grid-cols-1 h-full">
            <aside className="h-[calc(100vh-80px)] overflow-y-hidden">
              {sidebar}
            </aside>
            <main className="flex-1 px-6">{children}</main>
          </div>
        ) : (
          <main className="flex-1 px-6">{children}</main>
        )}
      </div>
    </>
  )
}

export default Layout
