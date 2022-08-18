import { DisturbanceFormType } from '../../../types/disturbance'
import { getSession } from 'next-auth/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function getDisturbances() {
  return fetch(`${API_URL}/disturbances?populate=*`)
}

export async function getDisturbance(slug: string) {
  return fetch(`${API_URL}/slugify/slugs/disturbance/${slug}?populate=*`)
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
) {
  const session = await getSession()
  const jwt = session?.jwt

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
      longitude,
      latitude,
      company,
      relationship,
    })
  )
  formdata.append('files.thumbnail', thumbnail)

  return fetch(`${API_URL}/disturbances`, {
    method: 'Post',
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${jwt}`,
    },
    body: formdata,
  })
}
