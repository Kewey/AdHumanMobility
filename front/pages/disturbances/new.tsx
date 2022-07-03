import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import Input from '../../components/form/Input'
import Layout from '../../components/Layout'
import Textarea from '../../components/form/Textarea'
import Checkbox from '../../components/form/Checkbox'
import { postDisturbance } from '../api/disturbances'
import { DisturbanceFormType } from '../../types/disturbance'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UploadPhotos from '../../components/form/Photos'

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

function NewDisturbance() {
  const { register, handleSubmit } = useForm<DisturbanceFormType>({})
  const router = useRouter()

  const { data: session } = useSession()

  const onSubmit = async ({ thumbnail, ...data }: any) => {
    const body = { ...data, author: session?.id }

    try {
      await postDisturbance(body, thumbnail)
      // router.back()
    } catch (error) {
      console.error('error', error)
    }
  }

  return (
    <Layout title="Connexion">
      <div className="flex flex-col h-screen">
        <div className="relative p-4 border-b border-gray-200 border-solid">
          <h1 className="text-center">Ajoutez une perturbation</h1>
          <div>
            <Link href={'/'}>
              <FontAwesomeIcon
                icon={faTimes}
                className="absolute right-4 top-5 text-xl"
              />
            </Link>
          </div>
        </div>
        <div className="overflow-y-auto p-4 flex-1">
          <form
            id="disturbanceForm"
            onSubmit={handleSubmit(onSubmit)}
            className="grid lg:grid-cols-2 grid-cols-1 gap-8 max-w-3xl m-auto"
          >
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
              <Input
                register={register}
                name="location"
                label="Lieu de la perturbation"
                placeholder="2 Quai des Queyries, 33100 Bordeaux"
                type={'text'}
              />
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

            {/* TODO : Radio */}
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

            <div className="mb-3">
              <Input
                register={register}
                name="company"
                label="Nom de l'entreprise concernées"
                placeholder="Uber, Lime, ..."
                type={'text'}
              />
            </div>

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
        </div>
        <div className="relative p-4 pt-2 border-t border-gray-200 border-solid">
          <div className="max-w-3xl mx-auto">
            <Button
              type="submit"
              variant="primary"
              block
              form="disturbanceForm"
            >
              Connexion
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NewDisturbance
