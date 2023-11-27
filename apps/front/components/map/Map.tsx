"use client"

import "leaflet/dist/leaflet.css"
import { LatLngTuple } from "leaflet"
import {
  MapContainer,
  MapContainerProps,
  TileLayer,
  ZoomControl,
} from "react-leaflet"

import { UpdateQuery } from "@/components/map"

interface MapProps extends MapContainerProps {
  children: React.ReactNode
}

const DEFAULT_CENTER: LatLngTuple = [48.8534951, 2.3483915]

const Map = ({ children, center = DEFAULT_CENTER, ...rest }: MapProps) => {
  return (
    <MapContainer
      zoomControl={false}
      className={`z-0 h-full w-full`}
      center={center}
      scrollWheelZoom
      {...rest}
    >
      <ZoomControl position="topright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UpdateQuery />
      {children}
    </MapContainer>
  )
}

export default Map
