import Image from 'next/image'
import { displayMedia } from '../types/api'
import { Disturbance as DisturbanceType } from '../types/disturbance'
import Badge from './Badge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBuilding,
  faMapPin,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface DisturbanceProps {
  disturbance: DisturbanceType
}

export const Disturbance = ({
  disturbance: {
    title,
    description,
    thumbnail,
    type,
    car_type,
    status,
    location,
    company,
    ...disturbance
  },
}: DisturbanceProps) => {
  console.log('disturbance', disturbance)
  return (
    <div className="flex flex-col lg:h-full h-screen">
      <div className="relative p-4 border-b border-gray-200 border-solid">
        <h1 className="text-center">{title}</h1>
        <div>
          <Link href={'/'}>
            <FontAwesomeIcon
              icon={faTimes}
              className="absolute right-4 top-5 text-xl"
            />
          </Link>
        </div>
      </div>
      <div className="p-4 overflow-y-auto flex-1">
        {thumbnail.data && (
          <div className="mb-3">
            <Image
              src={displayMedia(thumbnail.data.attributes.url)}
              alt={title}
              height={175}
              layout="responsive"
              width={335}
              className="rounded-xl"
              objectFit="cover"
              objectPosition={'50% 50%'}
            />
          </div>
        )}
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
        <div className="flex items-center py-3">
          <FontAwesomeIcon icon={faMapPin} className="mr-2 text-gray-600" />
          <p className="text-gray-600">{location}</p>
        </div>
        <hr />
        {company && (
          <>
            <div className="flex items-center py-3">
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-2 text-gray-600"
              />
              <p className="text-gray-600">{company}</p>
            </div>
            <hr />
          </>
        )}
      </div>
    </div>
  )
}
