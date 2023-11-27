"use client"

import React, { useState } from "react"
import * as L from "leaflet"
import { Marker, useMapEvents } from "react-leaflet"

interface ClickedEventProps {
  onClick: (event: L.LeafletMouseEvent) => void
}

const icon = L.icon({
  iconUrl: "/marker-shadow.png",
  iconSize: [41, 41],
  iconAnchor: [20, 41],
  popupAnchor: [0, -41],
})

export default function ClickedEvent({ onClick }: ClickedEventProps) {
  const [position, setPosition] = useState<L.LatLngExpression | null>(null)
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onClick(e)
    },
  })

  return position === null ? null : <Marker icon={icon} position={position} />
}
