import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../components/Button'
import Input from '../../components/form/Input'
import Layout from '../../components/Layout'
import Textarea from '../../components/form/Textarea'
import Checkbox from '../../components/form/Checkbox'
import { postDisturbance } from '../api/disturbances'
import { DisturbanceFormType } from '../../types/disturbance'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import UploadPhotos from '../../components/form/Photos'
import { SearchPlace } from '../../components/form/SearchPlace'
import { getGeocode } from 'use-places-autocomplete'
import { getTypologies } from '../api/forms'
import { StrapiEntity } from '../../types/api'

enum IS_COMPANY {
  TRUE = 'Professionnel',
  FALSE = 'Particulier',
}

enum VEHICULE_TYPE {
  WALKER = 'Piéton',
  BIKE = 'Vélo',
  SCOOTER = 'Trottinette',
  CAR = 'Voiture',
  TRUCK = 'Camion',
}

export const getServerSideProps = async () => {
  const res = await getTypologies()
  const typologies = await res.json()

  return {
    props: {
      typologies: typologies.data,
    },
  }
}

interface NewDisturbanceProps {
  typologies: StrapiEntity<any>[]
}

function NewDisturbance({ typologies }: NewDisturbanceProps) {
  const { register, handleSubmit, control, setValue, watch } =
    useForm<DisturbanceFormType>({})
  const router = useRouter()

  const { data: session } = useSession()

  const onSubmit = async ({ thumbnail, ...data }: any) => {
    const body = { ...data, author: session?.id }

    try {
      await postDisturbance(body, thumbnail)
      router.back()
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <Layout title="Déclaration" description="">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-3">Déclarer une perturbation</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            voluptas repellat praesentium laboriosam accusamus numquam fuga
            eveniet ullam, nostrum deserunt, sapiente similique! Ipsum mollitia
            animi, commodi in a delectus libero.
          </p>
        </div>
        <form
          id="disturbanceForm"
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 grid-cols-1 gap-8"
        >
          <div className="col-span-full">
            {typologies?.map((typology) => (
              <Checkbox
                register={register}
                name="typology"
                label={typology.attributes.label}
                type={'radio'}
                value={typology.id.toString()}
              />
            ))}
          </div>

          <div className="mb-3">
            <Input
              register={register}
              name="title"
              label="Nom de la perturbation"
              placeholder="Passage piéton rue Belvard"
              type={'text'}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 text-gray-400 font-semibold block w-full">
              Lieu de la perturbation
            </label>
            <Controller
              control={control}
              name="location"
              render={() => (
                <SearchPlace
                  goToLocation={async (location) => {
                    setValue('latitude', location.lat)
                    setValue('longitude', location.lng)

                    const res = await getGeocode({ location })
                    const { formatted_address } = res[0]
                    setValue('location', formatted_address)
                  }}
                />
              )}
            />
            {/* <Input
              register={register}
              name="location"
              label="Lieu de la perturbation"
              placeholder="2 Quai des Queyries, 33100 Bordeaux"
              type={'text'}
            /> */}
          </div>

          {/* PHOTO TODO */}
          <div className="mb-3">
            <UploadPhotos
              register={register}
              name="thumbnail"
              label="Photo de la perturbation ou des lieux"
            />
          </div>

          <div className="mb-3">
            <Input
              register={register}
              name="relationship"
              label="Votre lien de parenté"
              placeholder="Parent, ami, collègue, passant, ..."
              type={'text'}
            />
          </div>

          <div className="mb-3">
            <h4 className="mb-2 text-gray-400 font-semibold block w-full">
              Entreprise mise en cause ?
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Checkbox
                register={register}
                name="type"
                label="Oui"
                type={'radio'}
                value={IS_COMPANY.TRUE}
              />
              <Checkbox
                register={register}
                name="type"
                label="Non"
                type={'radio'}
                value={IS_COMPANY.FALSE}
              />
            </div>
          </div>

          {watch('type') === IS_COMPANY.TRUE && (
            <div className="mb-3">
              <Input
                register={register}
                name="company"
                label="Nom de l'entreprise concernées"
                placeholder="Uber, Lime, ..."
                type={'text'}
              />
            </div>
          )}

          <div className="mb-3 lg:col-span-2">
            <h4 className="mb-2 text-gray-400 font-semibold block w-full">
              Type de véhicule
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Checkbox
                register={register}
                name="car_type"
                label="Piéton"
                type={'radio'}
                value={VEHICULE_TYPE.WALKER}
              />
              <Checkbox
                register={register}
                name="car_type"
                label="Vélo"
                type={'radio'}
                value={VEHICULE_TYPE.BIKE}
              />
              <Checkbox
                register={register}
                name="car_type"
                label="Trotinette"
                type={'radio'}
                value={VEHICULE_TYPE.SCOOTER}
              />
              <Checkbox
                register={register}
                name="car_type"
                label="Voiture"
                type={'radio'}
                value={VEHICULE_TYPE.CAR}
              />
              <Checkbox
                register={register}
                name="car_type"
                label="Camion / Camionnette"
                type={'radio'}
                value={VEHICULE_TYPE.TRUCK}
              />
            </div>
          </div>

          <div className="mb-3 lg:col-span-2">
            <Textarea
              register={register}
              name="description"
              label="Description de la perturbation"
              placeholder="Décrivez les lieux, si une ou plusieurs personnes sont bléssées, ..."
              rows={4}
            />
          </div>
        </form>
        <Button type="submit" variant="primary" block form="disturbanceForm">
          Envoyer le dossier
        </Button>
      </div>
    </Layout>
  )
}

export default NewDisturbance
