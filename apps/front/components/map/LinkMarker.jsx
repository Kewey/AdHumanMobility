"use client"

import { useRouter } from "next/navigation"

import { Marker } from "./"

export default function LinkMarker({ position, link, ...props }) {
  const router = useRouter()
  return (
    <Marker position={position} onClick={() => router.push(link)} {...props} />
  )
}
