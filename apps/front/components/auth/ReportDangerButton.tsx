"use client"

import React from "react"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"

import { Button, buttonVariants } from "../ui/button"

type ReportDangerButtonProps = {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined
}

export default function ReportDangerButton({
  variant = "default",
}: ReportDangerButtonProps) {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
      <Link href={"/create"} className={buttonVariants({ variant })}>
        Signaler un danger
      </Link>
    )
  }

  return (
    <Button variant={variant} onClick={() => signIn()}>
      Connectez vous pour signaler
    </Button>
  )
}
