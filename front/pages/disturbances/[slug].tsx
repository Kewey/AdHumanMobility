import { NextPage } from 'next'
import Head from 'next/head'
import { Disturbance } from '../../components/Disturbance'
import { StrapiCall, StrapiEntity } from '../../types/api'
import { Disturbance as DisturbanceType } from '../../types/disturbance'
import { getDisturbance } from '../api/disturbances'

interface PostPageProps {
  disturbances: StrapiEntity<DisturbanceType>
}

const PostPage = ({ disturbances: { attributes } }: PostPageProps) => (
  <>
    <Head>
      <title>{attributes?.title}</title>
    </Head>
    <Disturbance disturbance={attributes} />
  </>
)

PostPage.getInitialProps = async ({
  query: { slug },
}: {
  query: { slug: string }
}) => {
  if (!slug || Array.isArray(slug)) return

  const res = await getDisturbance(slug)
  const { data: disturbance } = await res.json()
  return { disturbance }
}

export default PostPage
