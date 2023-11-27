"use client"

import { useSession } from "next-auth/react"

type AuthCheckProps = {
  children: React.ReactNode
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const { status } = useSession()

  if (status === "authenticated") {
    return children
  } else {
    return <></>
  }
}
