import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import { postDisturbance } from '../../../services/disturbanceService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(401)
  }

  console.log('body', req.body)

  try {
    const disturbance = await postDisturbance(req.body)
    res.status(200).json(disturbance)
  } catch (error) {
    console.log('error', error)
    // res.status(error.response.data.status).json(error.response.data.message)
  }
}

export default withSentry(handler)
