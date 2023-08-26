import React from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { disruptionService } from "@/services"
import mediaService from "@/services/mediaService"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentUserCheck } from "@/components/auth"

const MiniMap = dynamic(() => import("./MiniMap"), { ssr: false })

interface DisturbancePageProps {
  params: { id: string }
}

export default async function DisturbancePage({
  params,
}: DisturbancePageProps) {
  const id = params.id

  const disturbance = await disruptionService.get(id)

  const informations = [
    { title: "Typologie", content: disturbance.typology.label },
    { title: "Categorie", content: disturbance.category.label },
    { title: "Auteur du signalement", content: "Anonyme" },
    { title: "Status juridique", content: "Information manquante" },
  ]

  return (
    <div className="container flex flex-col py-4 md:py-6 lg:py-10">
      <h1 className="mb-4 text-xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl">
        {disturbance.transportType}: {disturbance.subCategory.label}
      </h1>
      <AspectRatio ratio={16 / 9} className="mb-4 overflow-hidden rounded-lg">
        <Image
          src={mediaService.getMedia(disturbance.contentUrl ?? "")}
          fill
          alt="evidences"
          className="blur"
        />
        <Image
          src={mediaService.getMedia(disturbance.contentUrl ?? "")}
          fill
          alt="evidences"
          className="rounded-lg object-contain"
        />
      </AspectRatio>

      <div className="grid gap-4 lg:grid-cols-[1fr_384px]">
        <div>
          <p className="mt-2">{disturbance.content}</p>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complément d&apos;information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="space-y-1">
                <h5 className="text-sm font-medium leading-none">
                  Lieu du danger
                </h5>
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-md"
                >
                  <MiniMap center={[disturbance.lat, disturbance.long]} />
                </AspectRatio>
              </div>
              {informations.map((information, index) => (
                <div className="space-y-1" key={index}>
                  <h5 className="text-sm font-medium leading-none">
                    {information.title}
                  </h5>
                  <p className="text-sm text-muted-foreground">
                    {information.content ?? "Information manquante"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <CurrentUserCheck user={disturbance.author}>
            <Card>
              <CardHeader>
                <CardTitle>Options</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Button variant={"outline"} className="w-full">
                      Editer le signalement
                    </Button>
                    <Button variant={"destructive"} className="w-full">
                      Supprimer le signalement
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CurrentUserCheck>
        </div>
      </div>
    </div>
  )
}
