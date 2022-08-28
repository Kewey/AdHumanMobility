import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { getDisturbances } from './api/disturbances'
import { StrapiEntity } from '../types/api'
import { Disturbance as DisturbanceType } from '../types/disturbance'
import { useContextualRouting } from 'next-use-contextual-routing'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import { Disturbance } from '../components/Disturbance'
import {
  GoogleMap,
  Marker,
  MarkerClusterer,
  useLoadScript,
} from '@react-google-maps/api'
import {
  faFolder,
  faMapLocation,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pin } from '../components/Pin'
import Layout from '../components/Layout'

Modal.setAppElement('#__next')

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
  const { data: session } = useSession()

  const [centerMap, setCenterMap] = useState({
    lat: 44.837789,
    lng: -0.57918,
  })

  const setApproximatedUserLocation = async () => {
    try {
      const res = await fetch(
        'https://www.googleapis.com/geolocation/v1/geolocate?key=' +
          process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
        {
          method: 'post',
        }
      )
      const {
        location: { lat, lng },
      } = await res.json()

      setCenterMap({ lat, lng })
    } catch (error) {
      console.error('error', error)
    }
  }

  useEffect(() => {
    setApproximatedUserLocation()
  }, [])

  const libraries = useMemo<
    ('places' | 'drawing' | 'geometry' | 'localContext' | 'visualization')[]
  >(() => ['places'], [])

  const { isLoaded: isMapLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || '',
    libraries: libraries,
    language: 'fr',
  })

  const [selectedDisturbance, setSelectedDisturbance] =
    useState<DisturbanceType | null>(null)

  const { makeContextualHref, returnHref } = useContextualRouting()
  const router = useRouter()

  const onPinClicked = (key: number, childProps: any) => {
    console.log('childProps', childProps)
    const { lat, lng } = childProps
    setCenterMap({ lat, lng })
  }

  const mapRef = useRef<GoogleMap>()

  const options = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: 'a72a1dea3db3656a',
    }),
    []
  )

  const onLoad = useCallback((map: any) => {
    mapRef.current = map
  }, [])

  return (
    <Layout
      callback={(lat, lng) => mapRef.panTo({ lat, lng })}
      title={
        !!router.query.slug
          ? selectedDisturbance?.title || 'Error'
          : 'Bienvenue'
      }
      description={
        !!router.query.slug
          ? `${selectedDisturbance?.description.slice(0, 160)}...`
          : 'TODO'
      }
    >
      <>
        <Modal
          isOpen={!!router.query.slug}
          onRequestClose={() => router.push('/')}
          contentLabel={selectedDisturbance?.title}
          className="absolute lg:top-8 top-0 lg:bottom-8 bottom-0 left-0 right-0 max-w-4xl bg-white mx-auto lg:rounded-xl"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
          }}
        >
          {selectedDisturbance && (
            <Disturbance disturbance={selectedDisturbance} />
          )}
        </Modal>

        {session && (
          <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white z-50 grid grid-flow-col border-t border-gray-200 border-solid">
            <button className="flex flex-col items-center justify-center pt-4 pb-2 text-gray-900">
              <FontAwesomeIcon icon={faMapLocation} className="text-2xl mb-1" />
              <span className="text-sm">Carte</span>
            </button>
            <Link href={'disturbances/new'}>
              <button className="py-3">
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  className="text-5xl text-primary-500"
                />
              </button>
            </Link>
            <button className="flex flex-col items-center justify-center pt-4 pb-2 text-gray-500">
              <FontAwesomeIcon icon={faFolder} className="text-2xl mb-1" />
              <span className="text-sm">Dossiers</span>
            </button>
          </div>
        )}

        <div className="bg-slate-100 relative h-[calc(100vh-80px)] -mx-6">
          {isMapLoaded && (
            <GoogleMap
              zoom={12}
              center={centerMap}
              mapContainerClassName={'w-full h-full'}
              options={options}
              onLoad={onLoad}
            >
              <MarkerClusterer>
                {(clusterer) => {
                  return (
                    <>
                      {disturbances.map(
                        ({
                          id,
                          attributes: {
                            latitude,
                            longitude,
                            slug,
                            ...disturbance
                          },
                        }) => (
                          <Marker
                            key={id + 'mark'}
                            position={{
                              lat: latitude || 0,
                              lng: longitude || 0,
                            }}
                            clusterer={clusterer}
                            onClick={() => {
                              setSelectedDisturbance({
                                ...disturbance,
                                latitude,
                                longitude,
                                slug,
                              })
                              router.push(
                                makeContextualHref({ slug }),
                                `disturbances/${slug}`
                              )
                            }}
                          />
                        )
                      )}
                    </>
                  )
                }}
              </MarkerClusterer>
            </GoogleMap>
          )}
        </div>
      </>
    </Layout>
  )
}

export default Home
