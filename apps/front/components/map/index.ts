"use client"

import dynamic from "next/dynamic"

import DisruptionMarker from "./DisruptionMarker"
import LinkMarker from "./LinkMarker"
import Marker from "./Marker"

const Map = dynamic(() => import("@/components/map/Map"), { ssr: false })
const UpdateQuery = dynamic(() => import("@/components/map/UpdateQuery"), {
  ssr: false,
})
const ClickedEvent = dynamic(() => import("@/components/map/ClickedEvent"), {
  ssr: false,
})
const Location = dynamic(() => import("@/components/map/LocationMarker"), {
  ssr: false,
})

export {
  Map,
  Marker,
  Location,
  LinkMarker,
  UpdateQuery,
  ClickedEvent,
  DisruptionMarker,
}
