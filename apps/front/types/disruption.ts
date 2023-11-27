import { Media } from "./media"
import { TYPOLOGY_ENUM, Typology } from "./typology"
import { User } from "./user"

export interface Disruption {
  // uuid: string
  id: number
  // type: Disruption_TYPE
  transportType: VEHICULE_TYPE
  priority: PRIORITY
  author: User
  status: string
  content: string
  // location: string
  long: number
  lat: number
  // company: any
  // relationship: string | null
  contentUrl?: string
  createdAt: string
  updatedAt: string
  [TYPOLOGY_ENUM.TYPOLOGY]: Typology
  [TYPOLOGY_ENUM.CATEGORY]: Typology
  [TYPOLOGY_ENUM.SUB_CATEGORY]: Typology
  // disruptionAt: string
}

export enum Disruption_TYPE {
  PROFESSIONAL = "Professionnel",
  INDIVIDUAL = "Particulier",
}

export enum VEHICULE_TYPE {
  WALKER = "walker",
  BIKE = "bike",
  SCOOTER = "scooter",
  CAR = "car",
  TRUCK = "truck",
}

export enum PRIORITY {
  LOW = "Faible",
  MEDIUM = "Genante",
  HIGH = "Dangeureuse",
}

export interface DisruptionFormType {
  type: "Professionnel" | "Particulier"
  transportType: "walker" | "bike" | "scooter" | "car" | "truck"
  priority: "low" | "medium" | "high"
  file: FileList
  // company: string
  [TYPOLOGY_ENUM.TYPOLOGY]: number
  [TYPOLOGY_ENUM.CATEGORY]: number
  [TYPOLOGY_ENUM.SUB_CATEGORY]: number
  // instances: string[]
  // status: string
  content: string
  // location: string
  long: number
  lat: number
  // relationship: string
  disruptionAt: Date
}
