import React from "react"
import { LatLngTuple } from "leaflet"

import { Map, Marker } from "@/components/map"

type MiniMapProps = {
  center: LatLngTuple
}

export default function MiniMap({ center }: MiniMapProps) {
  return (
    <Map center={center} zoom={20}>
      <Marker position={center} />
    </Map>
  )
}
