"use client"

import React from "react"
import * as L from "leaflet"
import { Marker as BaseMarker } from "react-leaflet"

const icon = L.icon({
  iconUrl: "/marker-shadow.png",
  iconSize: [41, 41],
  iconAnchor: [20, 41],
  popupAnchor: [0, -41],
})

interface MarkerProps extends L.MarkerOptions {
  position: L.LatLngTuple
  onClick?: () => void
  children?: React.ReactElement
}

export default function Marker({
  position,
  onClick = () => {},
  ...props
}: MarkerProps) {
  return (
    <BaseMarker
      position={position}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
      {...props}
    ></BaseMarker>
  )
}
