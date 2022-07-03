import fetch from 'isomorphic-fetch'
import { StrapiCall, StrapiEntity } from '../../../types/api'
import { Disturbance, DisturbanceFormType } from '../../../types/disturbance'
import { getSession } from 'next-auth/react'
import { format } from 'path'

export function getDisturbances() {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/disturbances?populate=*`)
}

export async function getDisturbance(
  slug: string
): Promise<StrapiCall<StrapiEntity<Disturbance>>> {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/slugify/slugs/disturbance/${slug}?populate=*`
  )
}

export async function postDisturbance(
  {
    author,
    instances,
    title,
    type,
    car_type,
    status,
    description,
    location,
    longitude,
    latitude,
    company,
    relationship,
  }: DisturbanceFormType,
  thumbnail: File
): Promise<Disturbance | undefined> {
  const { jwt } = await getSession()

  const formdata = new FormData()
  formdata.append('ref', 'api::disturbance.disturbance')
  formdata.append(
    'data',
    JSON.stringify({
      author,
      instances,
      title,
      type,
      car_type,
      status,
      description,
      location,
      longitude: 1,
      latitude: 1,
      company,
      relationship,
    })
  )
  formdata.append('files.thumbnail', thumbnail)

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/disturbances`, {
    method: 'Post',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwt}`,
    },
    body: formdata,
  })
}
