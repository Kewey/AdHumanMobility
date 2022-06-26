import { Disturbance as DisturbanceType } from '../types/disturbance'

interface DisturbanceProps {
  disturbance: DisturbanceType
}

export const Disturbance = ({
  disturbance: { title, description },
}: DisturbanceProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
