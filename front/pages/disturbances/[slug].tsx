import { NextPage } from 'next'
import { Disturbance } from '../../components/Disturbance'
import { StrapiEntity } from '../../types/api'
import { Disturbance as DisturbanceType } from '../../types/disturbance'
import { getPost } from '../api/disturbances'

interface PostPageProps {
  post: StrapiEntity<DisturbanceType>
}

const PostPage: NextPage = ({ post: { attributes } }: PostPageProps) => (
  <Disturbance disturbance={attributes} />
)

PostPage.getInitialProps = async ({ query: { slug } }) => {
  const res = await getPost(slug)
  const { data: post } = await res.json()
  return { post }
}

export default PostPage
