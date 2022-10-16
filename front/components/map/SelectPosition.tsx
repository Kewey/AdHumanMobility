import { useState, useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconMarker = new L.Icon({
  iconUrl: '/marker-shadow.png',
  iconAnchor: [20, 41],
  shadowUrl: '',
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new L.Point(41, 41),
})

interface SelectPositionProps {
  selectedPosition: [number, number]
  onChange: ([]: [number, number]) => void
}

export default function SelectPosition({
  selectedPosition: selectedPositionInit,
  onChange,
}: SelectPositionProps) {
  const [geoData, setGeoData] = useState<[number, number]>([0, 0])

  //   MARCHE PO
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords
      setGeoData([lat, lng])
    })
  }, [])

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
    <MapContainer center={geoData} zoom={13} style={{ height: '100%' }}>
      <SelectedMarker />
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}
