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
  description?: string
  marginHorizontal?: boolean
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
  marginHorizontal = true,
}: LayoutProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  })

  const [selectedValue, setSelectedValue] = useState('')

  const handleSelectedOption = async (
    selectedOption: google.maps.places.AutocompletePrediction
  ) => {
    if (!callback) return

    clearSuggestions()
    const [res] = await getGeocode({ placeId: selectedOption.place_id })
    const { lat, lng } = await getLatLng(res)
    callback(lat, lng)
  }

  return (
    <>
      <Head>
        <title>{title} | APP</title>
        {!!description && <meta name="description" content={description} />}
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header
          showResearch={!!callback}
          disabled={!ready}
          setQuery={setValue}
          options={data}
          query={value}
          selectedValue={selectedValue}
          handleSelectedOption={handleSelectedOption}
        />
        <div className={`flex-1 ${marginHorizontal ? 'my-8' : ''}`}>
          {sidebar ? (
            <div className="grid lg:grid-cols-[400px_1fr] grid-cols-1 h-full">
              <aside className="h-[calc(100vh-80px)] overflow-y-hidden">
                {sidebar}
              </aside>
              <main className="flex-1 px-6 relative">{children}</main>
            </div>
          ) : (
            <main className="flex-1 px-6 relative">{children}</main>
          )}
        </div>
      </div>
    </>
  )
}

export default Layout
