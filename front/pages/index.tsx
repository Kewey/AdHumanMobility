import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { getDisturbances } from './api/disturbances'
import { displayMedia, StrapiCall, StrapiEntity } from '../types/api'
import { Disturbance as DisturbanceType } from '../types/disturbance'
import { useContextualRouting } from 'next-use-contextual-routing'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import { Disturbance } from '../components/Disturbance'
import Image from 'next/image'
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
import { SearchPlace } from '../components/form/SearchPlace'

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

  const signInButtonNode = () => {
    if (session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <Button
            onClick={(e) => {
              e.preventDefault()
              signIn()
            }}
          >
            Sign In
          </Button>
        </Link>
      </div>
    )
  }

  const signOutButtonNode = () => {
    if (!session) {
      return false
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          {!!router.query.slug ? selectedDisturbance?.title : 'Bienvenue'}
        </title>
        <meta
          name="description"
          content={
            !!router.query.slug
              ? `${selectedDisturbance?.description.slice(0, 160)}...`
              : 'TODO'
          }
        />
      </Head>
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

      <div className="hero">
        <div className="absolute z-10 right-4 top-4">
          Menu
          {signInButtonNode()}
          {signOutButtonNode()}
        </div>

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

        <div className="grid lg:grid-cols-[360px_1fr] grid-cols-1 h-full">
          <aside className="p-4 h-screen overflow-y-auto lg:block hidden">
            {session && (
              <Link href={'disturbances/new'}>
                <Button block>Ajouter un incident</Button>
              </Link>
            )}
            {isMapLoaded && (
              <div className="mt-4">
                <SearchPlace
                  goToLocation={(position) => {
                    mapRef.current?.panTo(position)
                  }}
                />
              </div>
            )}
            <div className="mt-4">
              {disturbances?.map(
                ({
                  id,
                  attributes: {
                    title,
                    type,
                    car_type,
                    status,
                    slug,
                    thumbnail,
                    ...disturbance
                  },
                }) => (
                  <Link
                    key={id}
                    as={`disturbances/${slug}`}
                    href={makeContextualHref({ slug })}
                    shallow
                  >
                    <article
                      className="mb-8 cursor-pointer"
                      onClick={() =>
                        setSelectedDisturbance({
                          title,
                          type,
                          car_type,
                          status,
                          slug,
                          thumbnail,
                          ...disturbance,
                        })
                      }
                    >
                      {thumbnail.data && (
                        <Image
                          src={displayMedia(thumbnail.data.attributes.url)}
                          alt={title}
                          height={175}
                          layout="responsive"
                          width={335}
                          className="rounded-xl"
                          objectFit="cover"
                        />
                      )}
                      <div className="flex justify-between mt-3">
                        <div className="grid grid-flow-col gap-2">
                          <Badge>{type}</Badge>
                          <Badge>{car_type}</Badge>
                        </div>

                        {status && <Badge color="bg-green-600">{status}</Badge>}
                      </div>
                      <h3 className="mt-2">{title}</h3>
                    </article>
                  </Link>
                )
              )}
            </div>
          </aside>
          <main className="bg-slate-100 relative min-h-screen">
            {isMapLoaded && (
              <GoogleMap
                zoom={12}
                center={centerMap}
                mapContainerClassName={'w-full h-full'}
                options={options}
                onLoad={onLoad}
              >
                <MarkerClusterer>
                  {(clusterer) => (
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
                            position={{ lat: latitude, lng: longitude }}
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
                  )}
                </MarkerClusterer>
              </GoogleMap>
            )}
          </main>
        </div>
      </div>
    </>
  )
}

export default Home
