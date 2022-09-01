import { StrapiCall, StrapiEntity } from './api'
import { Media } from './media'

export interface Disturbance {
  type: DISTURBANCE_TYPE
  car_type: VEHICULE_TYPE
  priority: PRIORITY
  status: string
  description: string
  location: string
  longitude: number
  latitude: number
  company: string | null
  relationship: string | null
  evidences: StrapiCall<Media>
  blurredEvidences?: StrapiCall<Media>
  createdAt: string
  updatedAt: string
  publishedAt: string
  disturbanceAt: string
}

export interface DisturbanceFormType {
  type: DISTURBANCE_TYPE
  car_type: VEHICULE_TYPE
  priority: PRIORITY
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
  referent?: string
  relationship: string
  disturbanceAt: string
}

export enum DISTURBANCE_TYPE {
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
