import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import Input from '../../components/form/Input'
import Layout from '../../components/Layout'
import Textarea from '../../components/form/Textarea'
import Checkbox from '../../components/form/Checkbox'

interface DisturbanceFormType {
  author: string
  instances: string[]
  title: string
  thumbnail: string
  type: string
  car_type: string
  status: string
  description: string
  location: string
  longitude: number
  latitude: number
  company?: string
  relationship: string
}

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

enum STATUS {
  ONGOING = 'En cours',
  DONE = 'Terminé',
}

function NewDisturbance() {
  const { register, handleSubmit } = useForm<DisturbanceFormType>({})

  const onSubmit = (data: any) => {
    console.log('data', data)
  }

  return (
    <Layout title="Connexion">
      <div className="max-w-md m-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">Ajoutez une perturbation</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Input
              label="Nom de la perturbation"
              placeholder="Passage piéton rue Belvard"
              type={'text'}
              {...register('title')}
            />
          </div>

          <div className="mb-3">
            <Input
              label="Lieu de la perturbation"
              placeholder="2 Quai des Queyries, 33100 Bordeaux"
              type={'text'}
              {...register('location')}
            />
          </div>

          {/* PHOTO TODO */}
          <div className="mb-3">
            <Input
              label="Photo de la perturbation ou des lieux"
              type={'text'}
              {...register('thumbnail')}
            />
          </div>

          <div className="mb-3">
            <Input
              label="Votre lien de parenté"
              placeholder="Parent, ami, collègue, passant, ..."
              type={'text'}
              {...register('relationship')}
            />
          </div>

          {/* TODO : Radio */}
          <div className="mb-3">
            <h4 className="mb-2 text-gray-400 font-semibold block w-full">
              Entreprise mise en cause ?
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Checkbox
                label="Oui"
                type={'radio'}
                value={IS_COMPANY.TRUE}
                {...register('type')}
              />
              <Checkbox
                label="Non"
                type={'radio'}
                value={IS_COMPANY.FALSE}
                {...register('type')}
              />
            </div>
          </div>

          <div className="mb-3">
            <Input
              label="Nom de l'entreprise concernées"
              placeholder="Uber, Lime, ..."
              type={'text'}
              {...register('company')}
            />
          </div>

          <div className="mb-3">
            <h4 className="mb-2 text-gray-400 font-semibold block w-full">
              Type de véhicule
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Checkbox
                label="Piéton"
                type={'radio'}
                value={VEHICULE_TYPE.WALKER}
                {...register('car_type')}
              />
              <Checkbox
                label="Vélo"
                type={'radio'}
                value={VEHICULE_TYPE.BIKE}
                {...register('car_type')}
              />
              <Checkbox
                label="Trotinette"
                type={'radio'}
                value={VEHICULE_TYPE.SCOOTER}
                {...register('car_type')}
              />
              <Checkbox
                label="Voiture"
                type={'radio'}
                value={VEHICULE_TYPE.CAR}
                {...register('car_type')}
              />
              <Checkbox
                label="Camion / Camionnette"
                type={'radio'}
                value={VEHICULE_TYPE.TRUCK}
                {...register('car_type')}
              />
            </div>
          </div>

          <div className="mb-3">
            <Textarea
              label="Description de la perturbation"
              placeholder="Décrivez les lieux, si une ou plusieurs personnes sont bléssées, ..."
              rows={4}
              {...register('description')}
            />
          </div>

          <div className="mb-3">
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
