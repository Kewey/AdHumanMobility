import { Combobox } from '@headlessui/react'
import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SearchPlaceProps {
  goToLocation: ({ lat, lng }: { lat: number; lng: number }) => void
}

export const SearchPlace = ({ goToLocation }: SearchPlaceProps) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete()

  const handleSelectedOption = async (selectedOption: string) => {
    setValue(selectedOption, false)
    clearSuggestions()

    const res = await getGeocode({ address: selectedOption })
    const { lat, lng } = await getLatLng(res[0])
    goToLocation({ lat, lng })
  }

  return (
    <Combobox value={value} onChange={handleSelectedOption}>
      <div className="relative">
        <Combobox.Input
          disabled={!ready}
          placeholder="Rechercher un lieu, une ville, ..."
          className="focus:outline-none focus:border-primary-500 px-4 py-3 w-full border rounded-lg"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          // displayValue={(position) =>
          //     position.location
          // }
        />
        {status === 'OK' && (
          <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-64 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {data.map((option) => (
              <Combobox.Option
                key={option.place_id}
                value={option.description}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-primary-600' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9'
                  )
                }
              >
                {option.description}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
