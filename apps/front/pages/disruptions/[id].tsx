import { NextPage } from 'next'
import { Disruption } from '../../components/Disruption'
import Layout from '../../components/Layout'
import { Disruption as disruptionType } from '../../types/disruption'
import { disruptionService } from '../../services'

interface PostPageProps {
  disruption: disruptionType
}

const disruptionPage: NextPage<PostPageProps> = ({ disruption }) => {
  return (
    <Layout title={disruption.content}>
      <Disruption disruption={disruption} />
    </Layout>
  )
}

export async function getServerSideProps({
  query: { id },
}: {
  query: { id: string }
}) {
  if (!id || Array.isArray(id)) return

  const disruption = await disruptionService.get(id)
  return { props: { disruption } }
}

export default disruptionPage
