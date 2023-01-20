import type { NextApiRequest, NextApiResponse } from 'next'
import { withSentry } from '@sentry/nextjs'
import disruptionService from '../../../services/disruptionService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(401)
  }

  console.log('body', req.body)

  try {
    const disruption = await disruptionService.post(req.body)
    res.status(200).json(disruption)
  } catch (error) {
    console.log('error', error)
    // res.status(error.response.data.status).json(error.response.data.message)
  }
}

export default withSentry(handler)
