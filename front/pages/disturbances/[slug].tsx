import { NextPage } from 'next'
import Head from 'next/head'
import { Disturbance } from '../../components/Disturbance'
import Layout from '../../components/Layout'
import { StrapiEntity } from '../../types/api'
import { Disturbance as DisturbanceType } from '../../types/disturbance'
import { getDisturbance } from '../api/disturbances'

interface PostPageProps {
  disturbance: StrapiEntity<DisturbanceType>
}

const DisturbancePage: NextPage<PostPageProps> = ({ disturbance }) => {
  return (
    <Layout title={disturbance?.attributes?.location}>
      {disturbance && <Disturbance disturbance={disturbance?.attributes} />}
    </Layout>
  )
}

export async function getServerSideProps({
  query: { slug },
}: {
  query: { slug: string }
}) {
  if (!slug || Array.isArray(slug)) return

  const { data } = await getDisturbance(slug)
  return { props: { disturbance: data } }
}

export default DisturbancePage
