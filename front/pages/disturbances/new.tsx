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

  const onSubmit = async (data: any) => {
    try {
      await postDisturbance({ ...data, author: session?.id })
    } catch (error) {
      console.error('error', error)
    }
    router.back()
  }

  return (
    <Layout title="Connexion">
      <div className="max-w-3xl m-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">Ajoutez une perturbation</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 grid-cols-1 gap-8"
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
            <Input
              register={register}
              name="thumbnail"
              label="Photo de la perturbation ou des lieux"
              type={'text'}
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

          <div className="mb-3 lg:col-span-2">
            <Button type="submit" variant="primary" block>
              Connexion
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default NewDisturbance
