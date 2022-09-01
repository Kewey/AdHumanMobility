import React from 'react'
import { Combobox } from '@headlessui/react'
import { StrapiEntity } from '../../types/api'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface SearchProps<T> {
  options: T[]
  selectedValue: string
  displayedProperty: string
  query: string
  disabled?: boolean
  placeholder?: string
  setQuery: (value: string) => void
  handleSelectedOption: (value: any) => void
  handleAddNewOption?: (value: string) => void
}

export const SearchInput = ({
  selectedValue,
  query,
  setQuery,
  handleSelectedOption,
  handleAddNewOption,
  placeholder,
  disabled,
  options,
  displayedProperty,
}: SearchProps<StrapiEntity<any>>) => {
  return (
    <Combobox
      value={selectedValue}
      disabled={disabled}
      onChange={handleSelectedOption}
    >
      <div className="relative">
        <Combobox.Input
          className="focus:outline-none focus:border-primary-500 px-4 py-3 w-full border rounded-lg"
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          displayValue={(selected: StrapiEntity<any>) =>
            selected.attributes?.[displayedProperty]
          }
        />
        {query.length > 2 && (
          <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-64 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((option, index) => (
              <Combobox.Option
                key={index}
                value={option}
                className={({ active }) =>
                  classNames(
                    active ? 'text-white bg-primary-600' : 'text-gray-900',
                    'cursor-default select-none relative py-2 pl-3 pr-9'
                  )
                }
              >
                {option?.attributes?.[displayedProperty]}
              </Combobox.Option>
            ))}
            {!!handleAddNewOption && (
              <Combobox.Option
                value={null}
                disabled={
                  !!options.find(
                    (option) =>
                      option?.attributes?.[displayedProperty] === query
                  )
                }
              >
                <button
                  onClick={async () => {
                    const option: any = await handleAddNewOption(query)
                    if (!option?.data) {
                      return
                    }
                    handleSelectedOption(option)
                  }}
                  type="button"
                  className="text-left py-2 pl-3 pr-9 w-full bg-slate-50 hover:bg-slate-100"
                >
                  Ajouter
                  <span className="ml-1 p-1 bg-slate-200 rounded">{query}</span>
                </button>
              </Combobox.Option>
            )}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  )
}
