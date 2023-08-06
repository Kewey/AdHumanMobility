import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'leaflet/dist/leaflet.css'

import { Disruption as DisruptionType } from '../types/disruption'
import { disruptionService } from '../services'
import Layout from '../components/Layout'
import { Combobox } from '@headlessui/react'
import { Map } from 'leaflet'
import { Adress } from '../types/openStreetMap'
import axios from 'axios'
import { faCrosshairs, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { MapDisruptionsProps } from '../components/map/MapDisturbances'

const MapDisruptions = dynamic(
  () => import('../components/map/MapDisturbances'),
  {
    ssr: false,
  }
)
const MapDisruptionsRef = forwardRef(
  (props: MapDisruptionsProps, ref: ForwardedRef<Map | null>) => (
    <MapDisruptions {...props} forwardedRef={ref} />
  )
)

export const getServerSideProps = async () => {
  const { disruptions } = await disruptionService.getAll()

  return {
    props: {
      disruptions,
    },
  }
}

interface HomePageProps {
  disruptions: DisruptionType[]
}

const Home = ({ disruptions }: HomePageProps) => {
  const [centerMap, setCenterMap] = useState<[number, number]>([
    48.8588897, 2.3200410217200766,
  ])

  const [query, setQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [locationOptions, setLocationOptions] = useState<Adress[]>([])
  const [selectedLocationOptions, setSelectedLocationOptions] =
    useState<Adress | null>(null)

  const mapRef = useRef<Map | null>(null)

  useEffect(() => {
    async function searchPosition() {
      if (query.length < 3) return

      setIsLoading(true)
      const { data } = await axios.get<Adress[]>(
        'https://nominatim.openstreetmap.org/search',
        {
          params: {
            q: query,
            format: 'jsonv2',
            addressdetails: 1,
            countrycodes: 'fr',
          },
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      setIsLoading(false)
      setLocationOptions(data)
    }
    searchPosition()
  }, [query])

  const SearchBar = () => (
    <div className="flex">
      <Combobox
        value={selectedLocationOptions}
        onChange={(selected) => {
          if (!mapRef.current) return
          mapRef.current.flyTo(
            [parseFloat(selected?.lat || ''), parseFloat(selected?.lon || '')],
            mapRef.current.getZoom()
          )
          setSelectedLocationOptions(selected)
        }}
      >
        <div className="relative flex-1">
          {isLoading && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin={true}
              className="absolute top-4 right-3 "
            />
          )}
          <Combobox.Input
            name="location"
            onSubmit={() => {}}
            className="focus:outline-none focus:border-primary-500 px-4 py-3 w-full border border-slate-300 rounded-lg"
            placeholder={'Cherchez une ville, rue, ...'}
            onChange={(e) => setQuery(e.target.value)}
            displayValue={(selected: any) => selected?.display_name}
          />
          {query.length > 2 && (
            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-64 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {locationOptions?.map((option, index) => (
                <Combobox.Option
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-3 pr-9 ${
                      active ? 'text-white bg-primary-600' : 'text-gray-900'
                    }`
                  }
                >
                  {option.display_name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      <button
        type="button"
        className="focus:outline-none focus:border-primary-500 bg-white px-4 py-3 ml-2 border border-slate-300 rounded-lg"
        onClick={() => {
          if (!mapRef.current) return
          mapRef.current.locate().on('locationfound', function (e) {
            // @ts-ignore
            mapRef.current.flyTo(e.latlng, mapRef.current.getZoom())
          })
        }}
      >
        <FontAwesomeIcon icon={faCrosshairs} />
      </button>
    </div>
  )

  return (
    <Layout
      marginHorizontal={false}
      title="Bienvenue"
      searchBar={<SearchBar />}
    >
      <div className="bg-slate-100 h-[calc(100vh-80px)] -mx-6 overflow-hidden">
        <MapDisruptionsRef
          ref={mapRef}
          position={centerMap}
          disruptions={disruptions}
        />
      </div>
    </Layout>
  )
}

export default Home
