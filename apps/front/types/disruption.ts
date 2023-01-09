import { Media } from './media'
import { User } from './user'

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
  // disruptionAt: string
}

export interface DisruptionFormType {
  type: Disruption_TYPE
  car_type: VEHICULE_TYPE
  priority: PRIORITY
  evidences: FileList
  company: string
  typology: string
  category: string
  subCategory: string
  instances: string[]
  status: string
  description: string
  location: string
  longitude: number
  latitude: number
  relationship: string
  disruptionAt: string
}

export enum Disruption_TYPE {
  PROFESSIONAL = 'Professionnel',
  INDIVIDUAL = 'Particulier',
}

export enum VEHICULE_TYPE {
  WALKER = 'Piéton',
  BIKE = 'Vélo',
  SCOOTER = 'Trottinette',
  CAR = 'Voiture',
  TRUCK = 'Camion',
}

export enum PRIORITY {
  LOW = 'Faible',
  MEDIUM = 'Genante',
  HIGH = 'Dangeureuse',
}
