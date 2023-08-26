import React from "react"
import dynamic from "next/dynamic"
import { disruptionService } from "@/services"
import { LatLngTuple } from "leaflet"

import { siteConfig } from "@/config/site"
import { DisruptionMarker } from "@/components/map"

const Map = dynamic(() => import("@/components/map/Map"), { ssr: false })

interface MapPageProps {
  searchParams: { lat: string; lng: string; zoom: string }
}

export default async function MapPage({ searchParams }: MapPageProps) {
  const { disruptions } = await disruptionService.getAll({})

  let center: LatLngTuple = [
    parseFloat(searchParams.lat || ""),
    parseFloat(searchParams.lng || ""),
  ]

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Map
        center={searchParams.lat && searchParams.lng ? center : undefined}
        zoom={parseInt(searchParams.zoom) || siteConfig.map.zoom}
      >
        {disruptions.map((disruption) => (
          <DisruptionMarker key={disruption.id} disruption={disruption} />
        ))}
      </Map>
    </div>
  )
}
