import { NextPage } from 'next'
import { Disturbance } from '../../components/Disturbance'
import Layout from '../../components/Layout'
import { StrapiEntity } from '../../types/api'
import { Disturbance as DisturbanceType } from '../../types/disturbance'
import { getDisturbance } from '../api/disturbances'

interface PostPageProps {
  disturbance: StrapiEntity<DisturbanceType>
}

const DisturbancePage: NextPage<PostPageProps> = ({ disturbance }) => {
  console.log('disturbance', disturbance)
  return (
    <Layout title={disturbance?.attributes?.location}>
      {disturbance && <Disturbance disturbance={disturbance?.attributes} />}
    </Layout>
  )
}

export async function getServerSideProps({
  query: { uuid },
}: {
  query: { uuid: string }
}) {
  if (!uuid || Array.isArray(uuid)) return

  const { data } = await getDisturbance(uuid)
  return { props: { disturbance: data } }
}

export default DisturbancePage
