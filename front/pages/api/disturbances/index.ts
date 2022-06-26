import fetch from 'isomorphic-fetch'
import { StrapiCall, StrapiEntity } from '../../../types/api'
import { Disturbance } from '../../../types/disturbance'

export function getPosts(): Promise<StrapiCall<StrapiEntity<Disturbance[]>>> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/disturbances`)
}

export async function getPost(
  slug: string
): Promise<StrapiCall<StrapiEntity<Disturbance>>> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/slugify/slugs/disturbance/${slug}`
  )
}
