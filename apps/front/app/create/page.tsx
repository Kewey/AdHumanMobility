import React from "react"
import { typologyService } from "@/services"

import CreateDisturbanceForm from "@/app/create/createDisturbance"

export default async function CreateDisturbance() {
  const { typologies } = await typologyService.getTypologyChildren()


  return (
    <div>
      <section className="container flex flex-col pb-8 pt-6 md:py-10">
        <h1 className="text-xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl">
          Signaler un danger
        </h1>
        <p className="mt-2 max-w-[650px] text-muted-foreground sm:text-xl">
          Remplissez le formulaire pour informer les alentours
        </p>
        <div className="mt-4">
          <CreateDisturbanceForm typologies={typologies} />
        </div>
      </section>
    </div>
  )
}
