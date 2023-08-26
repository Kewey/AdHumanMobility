"use client"

import { Tooltip } from "react-leaflet"

import { Disruption } from "@/types/disruption"

import { LinkMarker } from "."

interface DisruptionsMarkerProps {
  disruption: Disruption
}

export default function DisruptionsMarker({
  disruption,
}: DisruptionsMarkerProps) {
  return (
    <LinkMarker
      position={[disruption.lat, disruption.long]}
      link={`map/${disruption.id}`}
    >
      <Tooltip direction="top" offset={[0, -40]}>
        <h2>
          {disruption.typology.label} - {disruption.category.label}
        </h2>
        <p>
          {disruption.createdAt} - {disruption.priority}
        </p>
        <p>
          {disruption.transportType} - {disruption.status}
        </p>
      </Tooltip>
    </LinkMarker>
  )
}
