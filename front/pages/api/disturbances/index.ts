import fetch from 'isomorphic-fetch'
import { getCookie } from 'cookies-next'
import { StrapiCall, StrapiEntity } from '../../../types/api'
import { Disturbance, DisturbanceFormType } from '../../../types/disturbance'
import { getSession } from 'next-auth/react'

export function getDisturbances(): Promise<
  StrapiCall<StrapiEntity<Disturbance[]>>
> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/disturbances`)
}

export async function getDisturbance(
  slug: string
): Promise<StrapiCall<StrapiEntity<Disturbance>>> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/slugify/slugs/disturbance/${slug}`
  )
}

export async function postDisturbance({
  author,
  instances,
  title,
  thumbnail,
  type,
  car_type,
  status,
  description,
  location,
  longitude,
  latitude,
  company,
  relationship,
}: DisturbanceFormType): Promise<Disturbance | undefined> {
  const { jwt } = await getSession()

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/disturbances`, {
    method: 'Post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      data: {
        author,
        instances,
        title,
        // thumbnail: 1,
        type,
        car_type,
        status,
        description,
        location,
        longitude: 1,
        latitude: 1,
        company,
        relationship,
      },
    }),
  })
}
