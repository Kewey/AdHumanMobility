"use client"

import { useCallback, useState } from "react"
import dynamic from "next/dynamic"
import { disruptionService, typologyService } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Typology } from "@/types/typology"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioCardGroups } from "@/components/forms"
import { ClickedEvent, Location, Map } from "@/components/map"
import { useRouter } from "next/navigation"

const MAX_FILE_SIZE = 5242880
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

const MapSelection = dynamic(() => import("./MapSelection"), { ssr: false })

const formSchema = z.object({
  typology: z.number({ required_error: "Ce champs est requis." }),
  category: z.number({ required_error: "Ce champs est requis." }),
  subCategory: z.number({
    required_error: "Ce champs est requis.",
  }),
  latlng: z.tuple([z.number(), z.number()], {
    required_error: "Vous devez indiquer le lieu du danger",
  }),
  disruptionAt: z.date({ required_error: "Séléctionnez une date" }),
  type: z.enum(["Professionnel", "Particulier"], {
    required_error: "Ce champs est requis.",
  }),
  transportType: z.enum(["walker", "bike", "scooter", "car", "truck"], {
    required_error: "Ce champs est requis.",
  }),
  content: z
    .string({ required_error: "Ce champs est requis." })
    .min(45, "La description est trop courte"),
  priority: z.enum(["low", "medium", "high"], {
    required_error: "Ce champs est requis.",
  }),
  file: z
    .any()
    .refine((files) => files?.length > 0, "Ce champs est requis.")
    .refine((files) => {
      // @ts-ignore
      return Array.from(files).some((file) => file?.size <= MAX_FILE_SIZE)
    }, `La taille maximum d'un fichier est de 5MB.`),
  // .refine(
  //   (files) =>
  //     Array.from(files).some((file) => {
  //       console.log(file?.type)

  //       ACCEPTED_IMAGE_TYPES.includes(file?.type)
  //     }),
  //   "Merci d'utiliser le format .jpg, .jpeg, ou .png."
  // ),
})

interface CreateDisturbanceFormProps {
  typologies: Typology[]
}

export default function CreateDisturbanceForm({
  typologies,
}: CreateDisturbanceFormProps) {
  const [categories, setCategories] = useState<Typology[]>([])
  const [subCategories, setSubCategories] = useState<Typology[]>([])

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // @ts-ignore
    await disruptionService.post({
      ...data,
      long: data.latlng[1],
      lat: data.latlng[0],
    })

    setIsLoading(false)

    router.push(`/map?lat=${data.latlng[0]}&lng=${data.latlng[1]}`)
  }

  const onTypologyChange = useCallback((typology: string) => {
    typologyService.getCategoriesFromTypology(typology).then((data) => {
      setCategories(data)
      setSubCategories([])
    })
  }, [])

  const onCategoryChange = useCallback((category: string) => {
    typologyService.getCategoriesFromTypology(category).then((data) => {
      setSubCategories(data)
    })
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="typology"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typologie de danger</FormLabel>
              <RadioCardGroups
                onValueChange={(value: string) => {
                  onTypologyChange(value)
                  field.onChange(value)
                }}
                options={typologies}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie de typologie</FormLabel>
              {form.getValues("typology") && categories.length > 0 ? (
                <RadioCardGroups
                  onValueChange={(value: string) => {
                    onCategoryChange(value)
                    field.onChange(value)
                  }}
                  options={categories}
                />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4">
                  <div className="text-sm font-medium leading-none">
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <AspectRatio ratio={16 / 9}></AspectRatio>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      En attente
                    </span>
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sous catégorie de typologie</FormLabel>
              {form.getValues("category") && subCategories.length > 0 ? (
                <RadioCardGroups
                  onValueChange={field.onChange}
                  options={subCategories}
                />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4">
                  <div className="text-sm font-medium leading-none">
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                      <AspectRatio ratio={16 / 9}></AspectRatio>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">
                      En attente
                    </span>
                  </div>
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latlng"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lieu du danger</FormLabel>
              <AspectRatio
                ratio={18 / 9}
                className="z-0 overflow-hidden rounded-lg"
              >
                <MapSelection onChange={field.onChange} />
              </AspectRatio>
              <FormDescription>
                Cliquez sur le lieu du danger que vous souhaitez signaler.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="disruptionAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date du danger signalé</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: fr })
                        ) : (
                          <span>Séléctionnez une date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Niveau de danger</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Séléctionnez un niveau" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="medium">Genante</SelectItem>
                    <SelectItem value="high">Dangeureuse</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Acteur du danger</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Séléctionnez un acteur" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Professionnel">Professionnel</SelectItem>
                    <SelectItem value="Particulier">Particulier</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transportType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Type de véhicule</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Séléctionnez un type de véhicule" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="walker">Piéton</SelectItem>
                    <SelectItem value="bike">Vélo</SelectItem>
                    <SelectItem value="scooter">Scooter</SelectItem>
                    <SelectItem value="car">Voiture</SelectItem>
                    <SelectItem value="truck">Bus</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Preuve(s) photo ou vidéo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="file"
                  value={undefined}
                  onChange={(event) => field.onChange(event.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Description du danger (45 caractères minimum)
              </FormLabel>
              <FormDescription>
                Faites une description claire pour que nos équipes interviennent
                rapidement.
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Expliquez les faits, lieux, etc"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} >{isLoading ? 'Enregistrement...': 'Signaler'}</Button>
      </form>
    </Form>
  )
}
