import axios from 'axios'
import {
  Disturbance,
  DisturbanceFormType,
  DISTURBANCE_TYPE,
} from '../types/disturbance'
import { getSession } from 'next-auth/react'
import { StrapiCall } from '../types/api'
import FormData from 'form-data'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function getDisturbances() {
  return fetch(`${API_URL}/disturbances?populate=*`)
}

export async function getDisturbance(
  uuid: string
): Promise<StrapiCall<Disturbance>> {
  const res = await fetch(`${API_URL}/disturbances/${uuid}?populate=*`)
  const data = await res.json()
  return data
}

export async function postDisturbance({
  referent,
  evidences,
  type,
  ...data
}: DisturbanceFormType & { author: string }): Promise<Disturbance> {
  const session = await getSession()
  const jwt = session?.jwt

  const formdata = new FormData()

  // Array.from(evidences).forEach((file) => {
  //   formdata.append('files.evidences', file, file.name)
  // })
  formdata.append(
    'data',
    JSON.stringify({
      ...data,
      type,
      referent: type === DISTURBANCE_TYPE.PROFESSIONAL ? referent : null,
    })
  )

  const { data: responseData } = await axios.post(
    `${API_URL}/disturbances`,
    formdata,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  )
  return responseData
}
