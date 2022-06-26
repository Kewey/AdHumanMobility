import { StrapiEntity } from './api'
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
  thumbnail: StrapiEntity<Media>
  createdAt: string
  updatedAt: string
  publishedAt: string
}
