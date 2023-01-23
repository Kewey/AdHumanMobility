import axios from 'axios'
import { getSession } from 'next-auth/react'
import {
  Disruption,
  DisruptionFormType,
  Disruption_TYPE,
} from '../types/disruption'
import { TYPOLOGY_ENUM } from '../types/typology'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

async function getAll(
  params = {}
): Promise<{ disruptions: Disruption[]; totalItems: number }> {
  const {
    data: { 'hydra:member': disruptions, 'hydra:totalItems': totalItems },
  } = await axios(`/disruptions`, {
    params,
    headers: {
      Authorization: '',
    },
  })

  return { disruptions, totalItems }
}

async function get(disruptionId: string, params = {}): Promise<Disruption> {
  const { data: disruption } = await axios(`/disruptions/${disruptionId}`, {
    params,
    headers: {
      Authorization: '',
    },
  })

  return disruption
}

async function post(data: DisruptionFormType): Promise<Disruption> {
  const session = await getSession()

  const { file, ...rawData } = data

  const jwt = session?.user.token

  const formdata = new FormData()

  Array.from(file).forEach((file) => {
    formdata.append('file', file, file.name)
  })

  for (const key in rawData) {
    if (Object.prototype.hasOwnProperty.call(rawData, key)) {
      // @ts-ignore
      const dataValue = rawData[key]
      switch (key) {
        case TYPOLOGY_ENUM.TYPOLOGY:
          formdata.append(key, `/typologies/${dataValue}`)
          break
        case TYPOLOGY_ENUM.CATEGORY:
          formdata.append(key, `/typologies/${dataValue}`)
          break
        case TYPOLOGY_ENUM.SUB_CATEGORY:
          formdata.append(key, `/typologies/${dataValue}`)
          break

        default:
          formdata.append(key, dataValue)
      }
    }
  }

  const { data: responseData } = await axios.post(`/disruptions`, formdata, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return responseData
}

const disruptionService = {
  getAll,
  get,
  post,
}

export default disruptionService
