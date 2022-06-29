import { NextPage } from 'next'
import { Disturbance } from '../../components/Disturbance'
import { StrapiCall, StrapiEntity } from '../../types/api'
import { Disturbance as DisturbanceType } from '../../types/disturbance'
import { getDisturbance } from '../api/disturbances'

interface PostPageProps {
  disturbances: StrapiCall<StrapiEntity<DisturbanceType>[]>
}

const PostPage: NextPage = ({ disturbance: { attributes } }: PostPageProps) => (
  <Disturbance disturbance={attributes} />
)

PostPage.getInitialProps = async ({ query: { slug } }) => {
  if (!slug || Array.isArray(slug)) return

  const res = await getDisturbance(slug)
  const { data: disturbance } = await res.json()
  return { disturbance }
}

export default PostPage
