import Image from "next/image"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { ReportDangerButton } from "@/components/auth"

export default async function HomePage() {
  return (
    <section id="hero">
      <div className="container flex flex-col pb-8 pt-6 md:py-10">
        <div className="mb-8 flex flex-1 flex-col items-start gap-2">
          <h1 className="text-xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-5xl">
            Signalez ou soyez informez en temps réel
            <br className="hidden sm:inline" /> des perturbations et danger
            alentours.
          </h1>
          <p className="mt-2 max-w-[650px] text-muted-foreground sm:text-xl">
            Travaux, danger sur la voirie, incivilité, ... restons vigilant !
          </p>

          <div className="my-4 flex w-full flex-col gap-2 md:flex-row">
            <Link
              href={"/map"}
              className={buttonVariants({
                variant: "outline",
                className: "px-0 !text-muted-foreground",
              })}
            >
              Consulter la carte
            </Link>
            <ReportDangerButton />
          </div>
        </div>
        {/* <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <div className="col-start-1 col-end-3 mb-2 flex h-full min-h-[250px] flex-col overflow-hidden rounded-xl bg-slate-50 md:min-h-[350px]">
            <div className="mx-auto max-w-md p-6 text-center">
              <h2 className="mb-2 text-xl font-semibold">
                Perturbations et danger
              </h2>
              <p className="text-slate-500">
                Soyez informé de tous les dangers grâce à notre carte dynamique
                en temps réel.
              </p>
            </div>
            <div className="relative mx-6 flex-1 ">
              <Image
                fill
                src={"/hero-background.jpg"}
                alt="Consulter la carte"
                className="rounded-t-lg object-cover"
              />
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-xl bg-slate-50">
            Signaler un danger <small>(Connexion requise)</small>
          </div>
        </div> */}
      </div>
    </section>
  )
}
