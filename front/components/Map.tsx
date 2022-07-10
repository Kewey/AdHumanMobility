import { GoogleMap, Marker } from '@react-google-maps/api'
import React, { useCallback, useMemo, useRef } from 'react'

interface MapProps {
  latlng: google.maps.LatLngLiteral
}

export const Map = ({ latlng }: MapProps) => {
  const mapRef = useRef<GoogleMap>()

  const options = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: 'a72a1dea3db3656a',
    }),
    []
  )

  const onLoad = useCallback((map: any) => {
    mapRef.current = map
  }, [])

  return (
    <GoogleMap
      zoom={12}
      center={latlng}
      mapContainerClassName={'w-full h-full'}
      options={options}
      onLoad={onLoad}
    >
      <Marker position={latlng} />
    </GoogleMap>
  )
}
