import Image from 'next/image'
import { displayMedia } from '../types/api'
import { Disturbance as DisturbanceType, PRIORITY } from '../types/disturbance'
import Badge from './Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faBuilding,
  faCalendar,
  faClock,
  faMapPin,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import dayjs from 'dayjs'

interface DisturbanceProps {
  disturbance: DisturbanceType
}

export const Disturbance = ({
  disturbance: {
    description,
    type,
    car_type,
    status,
    location,
    referent,
    createdAt,
    disturbanceAt,
    priority,
    blurredEvidences,
    ...disturbance
  },
}: DisturbanceProps) => (
  <div className="max-w-4xl mx-auto">
    <Link href={'/'}>
      <a>
        <FontAwesomeIcon icon={faAngleLeft} className="mr-1" />
        <span>Retour</span>
      </a>
    </Link>
    <div className="mt-4">
      {blurredEvidences && blurredEvidences?.data?.length > 0 ? (
        blurredEvidences?.data?.map((evidence) => (
          <>
            {evidence.attributes.mime.includes('image') && (
              <div className="mb-3">
                <Image
                  src={displayMedia(evidence.attributes.url)}
                  alt={evidence.attributes.name}
                  height={175}
                  layout="responsive"
                  width={335}
                  className="rounded-xl"
                  objectFit="cover"
                  objectPosition={'50% 50%'}
                />
              </div>
            )}
          </>
        ))
      ) : (
        <div className="w-full h-48 bg-slate-300 rounded-lg flex items-center justify-center p-6 text-center">
          <p className="text-slate-800">
            Aucun apercu disponible pour le moment
          </p>
        </div>
      )}
    </div>

    <h1 className="mt-4">{location}</h1>

    <div className="inline-grid grid-flow-col gap-3 mb-4">
      <Badge>{type}</Badge>
      <Badge>{car_type}</Badge>
      {status && <Badge>{status}</Badge>}
    </div>
    <h5>Description</h5>
    <p
      dangerouslySetInnerHTML={{ __html: description }}
      className="text-gray-600 mb-8"
    />

    <h5>Informations complementaires</h5>
    <div className="flex items-center py-3">
      <div>
        <h6 className="text-sm text-gray-400">Date de le perturbation</h6>
        <p className="text-gray-600">
          {dayjs(disturbanceAt).format('dddd DD MMMM YYYY')}
        </p>
      </div>
    </div>
    <hr />
    <div className="flex items-center py-3">
      <div>
        <h6 className="text-sm text-gray-400">Date de publication</h6>
        <p className="text-gray-600">
          {dayjs(createdAt).format('dddd DD MMMM YYYY')}
        </p>
      </div>
    </div>
    <hr />
    <div className="flex items-center py-3">
      <div>
        <h6 className="text-sm text-gray-400">Localisation</h6>
        <p className="text-gray-600">{location}</p>
      </div>
    </div>
    <hr />
    <div className="flex items-center py-3">
      <div>
        <h6 className="text-sm text-gray-400">Priorité</h6>
        {/* @ts-ignore */}
        <p className="text-gray-600">{PRIORITY[priority.toUpperCase()]}</p>
      </div>
    </div>
    <hr />
    {referent?.data && (
      <>
        <div className="flex items-center py-3">
          <div>
            <h6 className="text-sm text-gray-400">Société en cause</h6>
            <p className="text-gray-600">
              {referent?.data?.attributes?.companyName}
            </p>
          </div>
        </div>
        <hr />
      </>
    )}
  </div>
)
