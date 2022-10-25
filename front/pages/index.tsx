import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  faFolder,
  faMapLocation,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'leaflet/dist/leaflet.css'

import { Disturbance as DisturbanceType } from '../types/disturbance'
import { getDisturbances } from '../services/disturbanceService'
import { StrapiEntity } from '../types/api'
import Layout from '../components/Layout'

const Map = dynamic(() => import('../components/map/MapDisturbances'), {
  ssr: false,
})

export const getServerSideProps = async () => {
  const res = await getDisturbances()
  const disturbances = await res.json()

  return {
    props: {
      disturbances: disturbances.data,
    },
  }
}

interface HomePageProps {
  disturbances: StrapiEntity<DisturbanceType>[]
}

const Home = ({ disturbances }: HomePageProps) => {
  const [centerMap, setCenterMap] = useState<[number, number]>([
    48.8588897, 2.3200410217200766,
  ])

  const router = useRouter()
  const { data: session } = useSession()

  console.log(disturbances)

  return (
    <Layout
      marginHorizontal={false}
      callback={(lat, lng) => {}}
      title={'Bienvenue'}
      description={'TODO'}
    >
      <div className="bg-slate-100 h-[calc(100vh-80px)] -mx-6 overflow-hidden">
        <Map position={centerMap} disturbances={disturbances} />
      </div>
    </Layout>
  )
}

export default Home
