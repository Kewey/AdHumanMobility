import React from "react"

import { ClickedEvent, Location, Map } from "@/components/map"

export default function MapSelection({ onChange }) {
  return (
    <Map zoom={15}>
      <ClickedEvent
        onClick={(event) => {
          const { lat, lng } = event.latlng
          onChange([lat, lng])
        }}
      />
      <Location />
    </Map>
  )
}
