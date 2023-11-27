"use client"

import { useSession } from "next-auth/react"

import { User } from "@/types/user"

type CurrentUserCheckProps = {
  children: React.ReactNode
  user: User
}

export default function CurrentUserCheck({
  children,
  user,
}: CurrentUserCheckProps): JSX.Element | null {
  const { data: session, status } = useSession()

  if (status !== "authenticated") {
    return null
  }

  // @ts-ignore
  if (`/users/${session?.user?.id}` === user["@id"]) {
    return children as JSX.Element
  } else {
    return null
  }
}
