import React from "react"
import Image from "next/image"
import mediaService from "@/services/mediaService"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { FormControl, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioOptions({ onValueChange, options }) {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      className="grid grid-cols-2 gap-8 pt-2 md:grid-cols-4"
    >
      {options.map((option) => (
        <FormItem key={option.id}>
          <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
            <FormControl>
              <RadioGroupItem value={option.id} className="sr-only" />
            </FormControl>
            <div className="items-center rounded-md border-2 border-muted bg-white p-1 hover:border-accent">
              <AspectRatio ratio={16 / 9}>
                {option?.icon?.contentUrl ? (
                  <Image
                    src={mediaService.getMedia(option.icon.contentUrl)}
                    alt={option.label}
                    className="select-none rounded-md object-contain p-4"
                    fill={true}
                  />
                ) : null}
              </AspectRatio>
            </div>
            <span className="block w-full p-2 text-center font-normal">
              {option.label}
            </span>
          </FormLabel>
        </FormItem>
      ))}
    </RadioGroup>
  )
}
