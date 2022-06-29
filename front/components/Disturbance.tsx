import Image from 'next/image'
import { Disturbance as DisturbanceType } from '../types/disturbance'

interface DisturbanceProps {
  disturbance: DisturbanceType
}

export const Disturbance = ({
  disturbance: { title, description, ...disturbance },
}: DisturbanceProps) => {
  return (
    <div className="p-4">
      {/* <Image src={thumbnail.attributes.url} /> */}
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
