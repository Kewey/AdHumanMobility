import { NextPage } from 'next'
import { Disruption } from '../../components/Disruption'
import Layout from '../../components/Layout'
import { StrapiEntity } from '../../types/api'
import { Disruption as disruptionType } from '../../types/disruption'
import { disruptionService } from '../../services'

interface PostPageProps {
  disruption: StrapiEntity<disruptionType>
}

const disruptionPage: NextPage<PostPageProps> = ({ disruption }) => {
  console.log('disruption', disruption)
  return (
    <Layout title={disruption?.attributes?.location}>
      {disruption && <Disruption disruption={disruption?.attributes} />}
    </Layout>
  )
}

export async function getServerSideProps({
  query: { uuid },
}: {
  query: { uuid: string }
}) {
  if (!uuid || Array.isArray(uuid)) return

  const disruption = await disruptionService.get(uuid)
  return { props: { disruption } }
}

export default disruptionPage
