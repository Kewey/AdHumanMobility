import { StrapiCall, StrapiEntity } from './api'
import { Media } from './media'

export interface Disturbance {
  title: string
  type: string
  car_type: string
  status: string
  description: string
  location: string
  longitude: number
  latitude: number
  company: string | null
  relationship: string | null
  slug: string
  thumbnail: StrapiCall<StrapiEntity<Media>>
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface DisturbanceFormType {
  typology: string
  category: string
  subCategory: string
  author: string
  instances: string[]
  title: string
  thumbnail: File
  type: string
  car_type: string
  status: string
  description: string
  location: string
  longitude: number
  latitude: number
  company?: string
  relationship: string
}
