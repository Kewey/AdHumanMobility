"use client"

import { useMapEvents } from "react-leaflet"

import { siteConfig } from "@/config/site"

export default function UpdateQuery() {
  const map = useMapEvents({
    moveend(event) {
      if ("URLSearchParams" in window) {
        const searchParams = new URLSearchParams(window.location.search)
        const { lat, lng } = map.getCenter()
        const zoom = map.getZoom()
        searchParams.set("lat", lat.toString())
        searchParams.set("lng", lng.toString())
        if (zoom !== siteConfig.map.zoom) {
          searchParams.set("zoom", zoom)
        } else {
          searchParams.delete("zoom")
        }
        const newRelativePathQuery =
          window.location.pathname + "?" + searchParams.toString()
        history.replaceState(null, "", newRelativePathQuery)
      }
    },
  })

  return null
}
