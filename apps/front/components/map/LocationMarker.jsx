"use client"

import { useEffect } from "react"
import { useMap } from "react-leaflet"

export default function LocationMarker() {
  const map = useMap()

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map])

  return null
}
