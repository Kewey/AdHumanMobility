import { StrapiCallArray, StrapiEntity } from './api'
import { Referent } from './referent'
import { Media } from './media'

export interface Disruption {
  uuid: string
  type: Disruption_TYPE
  car_type: VEHICULE_TYPE
  priority: PRIORITY
  status: string
  description: string
  location: string
  longitude: number
  latitude: number
  referent?: { data: StrapiEntity<Referent> }
  relationship: string | null
  evidences: StrapiCallArray<Media>
  blurredEvidences?: StrapiCallArray<Media>
  createdAt: string
  updatedAt: string
  publishedAt: string
  disruptionAt: string
}

export interface DisruptionFormType {
  type: Disruption_TYPE
  car_type: VEHICULE_TYPE
  priority: keyof PRIORITY
  evidences: FileList
  typology: string
  category: string
  subCategory: string
  author: string
  instances: string[]
  status: string
  description: string
  location: string
  longitude: number
  latitude: number
  referent?: StrapiEntity<Referent>
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
