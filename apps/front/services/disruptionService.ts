import axios from 'axios'
import { Disruption } from '../types/disruption'

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
  })

  return disruption
}

// async function post({
//   referent,
//   evidences,
//   type,
//   ...data
// }: DisruptionFormType & { author: string }): Promise<Disruption[]>
// > {
//   const session = await getSession()
//   const jwt = session?.jwt

//   const formdata = new FormData()

//   // Array.from(evidences).forEach((file) => {
//   //   formdata.append('files.evidences', file, file.name)
//   // })
//   formdata.append(
//     'data',
//     JSON.stringify({
//       ...data,
//       type,
//       referent: type === Disruption_TYPE.PROFESSIONAL ? referent : null,
//     })
//   )

//   const { data: responseData } = await axios.post(`/disruptions`, formdata, {
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//     },
//   })
//   return responseData
// }

const disruptionService = {
  getAll,
  get,
  // post,
}

export default disruptionService
