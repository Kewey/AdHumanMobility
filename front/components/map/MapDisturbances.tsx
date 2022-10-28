import React, { ForwardedRef, useEffect, useRef } from 'react'
import { Icon, Map, Point } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Disturbance } from '../../types/disturbance'
import { StrapiEntity } from '../../types/api'
import Button from '../Button'
import { useRouter } from 'next/router'

const iconMarker = new Icon({
  iconUrl: '/marker-shadow.png',
  iconAnchor: [20, 41],
  shadowUrl: '',
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: new Point(41, 41),
})

export interface MapDisturbancesProps {
  position?: [number, number]
  disturbances?: StrapiEntity<Disturbance>[]
}

const MapDisturbances = ({
  forwardedRef,
  position,
  disturbances,
}: MapDisturbancesProps & { forwardedRef: ForwardedRef<Map | null> }) => {
  const router = useRouter()

  return (
    <MapContainer
      ref={forwardedRef}
      center={position}
      zoom={13}
      className="h-full"
    >
      {disturbances?.map(
        ({ id, attributes: { latitude, longitude, ...disturbance } }) => (
          <Marker
            key={id}
            icon={iconMarker}
            position={{
              lat: latitude || 0,
              lng: longitude || 0,
            }}
          >
            <Popup
              className="map-popup"
              offset={[0, -20]}
              minWidth={250}
              maxWidth={450}
            >
              <img
                src=""
                alt="WIP"
                className="h-[150px] w-full bg-slate-100 rounded-md mb-2"
              />
              <h4 className="mb-2">{disturbance.location}</h4>
              <div className="mb-4">
                <p>{disturbance.description.slice(0, 120)}...</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                block
                onClick={() => router.push(`/disturbances/${id}`)}
              >
                Voir le details
              </Button>
            </Popup>
          </Marker>
        )
      )}
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  )
}

export default MapDisturbances
