import React from 'react'
import { Combobox } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SearchProps<T> {
  options: T[]
  selectedValue: string
  query: string
  disabled?: boolean
  setQuery: (value: string) => void
  handleSelectedOption: (value: T) => void
}

export const SearchGoogleMap = ({
  selectedValue,
  query,
  setQuery,
  handleSelectedOption,
  disabled,
  options,
}: SearchProps<any>) => {
  return (
    <Combobox value={selectedValue} onChange={handleSelectedOption}>
      <div className="relative">
        <Combobox.Input
          className="focus:outline-none focus:border-primary-500 px-4 py-3 w-full border rounded-lg"
          disabled={disabled}
          placeholder="Cherchez une ville, rue, ..."
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          displayValue={(selected: google.maps.places.AutocompletePrediction) =>
            selected?.description
          }
        />
        {query.length > 2 && (
          <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-64 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Combobox.Option
                key={option.place_id}
                value={option}
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
