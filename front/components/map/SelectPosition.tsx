import { useState, useEffect, useRef } from 'react'
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { Map, Point, Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import { Combobox } from '@headlessui/react'
import { faCrosshairs, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Adress } from '../../types/ops'

const iconMarker = new Icon({
  iconUrl: '/marker-shadow.png',
  iconAnchor: [20, 41],
  shadowUrl: '',
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new Point(41, 41),
})

interface SelectPositionProps {
  selectedPosition: [number, number]
  onChange: ([]: [number, number]) => void
}

function MapLocate() {
  const map = useMap()

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map])
  return null
}

export default function SelectPosition({
  selectedPosition: selectedPositionInit,
  onChange,
}: SelectPositionProps) {
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

  const SelectedMarker = () => {
    const map = useMapEvents({
      click(e) {
        onChange([e.latlng.lat, e.latlng.lng])
      },
    })

    return selectedPositionInit ? (
      <Marker
        icon={iconMarker}
        key={selectedPositionInit[0]}
        position={selectedPositionInit}
        interactive={false}
      />
    ) : null
  }

  return (
    <div className="h-full w-full relative">
      <div className="flex absolute top-3 left-14 right-3 z-[800]">
        <Combobox
          value={selectedLocationOptions}
          onChange={(selected) => {
            if (!mapRef.current) return
            mapRef.current.flyTo(
              [
                parseFloat(selected?.lat || ''),
                parseFloat(selected?.lon || ''),
              ],
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
      <MapContainer
        ref={mapRef}
        center={[48.8588897, 2.3200410217200766]}
        zoom={13}
        className="h-full"
      >
        <MapLocate />
        <SelectedMarker />
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  )
}
