import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

import Button from '../../components/Button'
import Input from '../../components/form/Input'
import Layout from '../../components/Layout'
import Textarea from '../../components/form/Textarea'
import Checkbox from '../../components/form/Checkbox'
import { disruptionService, typologyService } from '../../services'
import {
  DisruptionFormType,
  Disruption_TYPE,
  PRIORITY,
  VEHICULE_TYPE,
} from '../../types/disruption'
import dayjs from 'dayjs'
import { Typology, TYPOLOGY_ENUM } from '../../types/typology'
import { SearchInput } from '../../components/form/SearchInput'
import { Referent } from '../../types/referent'
import { HydraRessource } from '../../types/api'

const Map = dynamic(() => import('../../components/map/SelectPosition'), {
  ssr: false,
})

export const getServerSideProps = async (
  context: GetSessionParams | undefined
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const {
    data: { 'hydra:member': typologies, 'hydra:totalItems': totalItems },
  } = await axios(`/typologies/${'1'}/children`, {
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  })

  return {
    props: {
      typologies,
    },
  }
}

interface NewDisruptionProps {
  typologies: Typology[]
}

function Newdisruption({ typologies }: NewDisruptionProps) {
  const [categories, setCategories] = useState<Typology[]>([])
  const [subCategories, setSubCategories] = useState<Typology[]>([])
  const [companies, setCompanies] = useState<Referent[]>([])
  const [companyQuery, setCompanyQuery] = useState<string>('')

  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<DisruptionFormType>({
      defaultValues: {
        lat: 0,
        long: 0,
      },
    })

  const router = useRouter()

  useEffect(() => {
    const subscription = watch(async (value, { name }) => {
      if (name !== TYPOLOGY_ENUM.TYPOLOGY) {
        return
      }

      const { typologies: categories } =
        await typologyService.getTypologyChildren(value[name])

      setCategories(categories)
      setValue(TYPOLOGY_ENUM.SUB_CATEGORY, '')
      setValue(TYPOLOGY_ENUM.CATEGORY, '')
      return
    })

    return () => subscription.unsubscribe()
  }, [watch(TYPOLOGY_ENUM.TYPOLOGY)])

  useEffect(() => {
    if (!categories?.length) {
      return
    }

    const subscription = watch(async (value, { name }) => {
      switch (name) {
        case TYPOLOGY_ENUM.CATEGORY:
          const { typologies: subCategories } =
            await typologyService.getTypologyChildren(value[name])
          setSubCategories(subCategories)
          setValue(TYPOLOGY_ENUM.SUB_CATEGORY, '')
          return
        default:
          return
      }
    })

    return () => subscription.unsubscribe()
  }, [categories])

  // useEffect(() => {
  //   if (!companyQuery) return

  //   async function getCompany() {
  //     const companies = await getCompanies(companyQuery)
  //     setCompanies(companies)
  //   }

  //   getCompany()
  // }, [companyQuery])

  /*

  SUBMIT
  
  */

  const onSubmit = async (data: DisruptionFormType) => {
    try {
      const res = await disruptionService.post(data)
      // await axios.post('/api/form/disruption', data)
      router.push(`/disruptions/${res.id}`)
    } catch (error) {
      const { message, response } = error as AxiosError<any>
      console.error(error)

      if (response?.status === 400) {
        // toast.error(response)
        return
      }

      toast.error(message)
    }
  }

  return (
    <Layout title="Nouvelle déclaration">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-3">Déclarer une perturbation</h1>
          <p>
            Afin d'enregistrer votre déclaration, remplissez les champs si
            dessous avec le plus d'informations possible.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-2 grid-cols-1 gap-8"
        >
          <div className="col-span-full">
            <label className="mb-2 text-gray-400 font-semibold block w-full">
              Choissiez une typologie
            </label>
            <div className="grid md:grid-cols-2 gap-2">
              {typologies?.map((typology, index) => (
                <Checkbox
                  key={index}
                  iconUrl={typology?.icon?.contentUrl}
                  register={register}
                  name="typology"
                  label={typology.label}
                  type={'radio'}
                  value={typology.id}
                />
              ))}
            </div>
          </div>

          {categories.length > 0 && (
            <div className="col-span-full">
              <label className="mb-2 text-gray-400  font-semibold block w-full">
                Choisissez une catégorie
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                {categories?.map((category, index) => (
                  <Checkbox
                    key={index}
                    iconUrl={category?.icon?.contentUrl}
                    register={register}
                    name="category"
                    label={category.label}
                    type={'radio'}
                    value={category.id}
                  />
                ))}
              </div>
            </div>
          )}

          {subCategories?.length > 0 && (
            <div className="col-span-full">
              <label className="mb-2 text-gray-400 font-semibold block w-full">
                Choisissez une sous catégorie
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                {subCategories?.map((subCategory, index) => (
                  <Checkbox
                    key={index}
                    iconUrl={subCategory?.icon?.contentUrl}
                    register={register}
                    name="subCategory"
                    label={subCategory.label}
                    type={'radio'}
                    value={subCategory.id}
                  />
                ))}
              </div>
            </div>
          )}

          {watch('subCategory') && (
            <>
              <div className="mb-3 lg:col-span-2">
                <label className="mb-2 text-gray-400 font-semibold block w-full">
                  Lieu de la perturbation
                </label>
                <div className="h-[500px] rounded-xl overflow-hidden">
                  <Map
                    selectedPosition={watch(['lat', 'long'])}
                    onChange={async ([lat, lon]: [number, number]) => {
                      const {
                        data: { address },
                      } = await axios.get(
                        'https://nominatim.openstreetmap.org/reverse',
                        {
                          params: {
                            lat,
                            lon,
                            format: 'jsonv2',
                          },
                        }
                      )

                      setValue(
                        'location',
                        `${address?.house_number} ${address?.road}, ${address?.city}, ${address?.country}`
                      )
                      setValue('lat', lat)
                      setValue('long', lon)
                    }}
                  />
                </div>
              </div>

              {/* <div className="mb-3">
              <Input
                register={register}
                name="relationship"
                label="Votre lien de parenté"
                placeholder="Parent, ami, collègue, passant, ..."
                type={'text'}
              />
            </div> */}

              <div className="mb-3">
                <Input
                  {...register('disruptionAt', {
                    max: dayjs().format('YYYY-MM-DDTHH:mm'),
                  })}
                  name="disruptionAt"
                  label="Date de la perturbation"
                  type="datetime-local"
                />
              </div>

              <div className="mb-3 lg:col-span-2">
                <label className="mb-2 text-gray-400 font-semibold block w-full">
                  Priorité de la perturbation
                </label>
                <div className="grid md:grid-cols-3 gap-2">
                  {(Object.keys(PRIORITY) as (keyof typeof PRIORITY)[]).map(
                    (key, index) => (
                      <Checkbox
                        key={index}
                        register={register}
                        name="priority"
                        label={PRIORITY[key]}
                        type={'radio'}
                        value={key.toLowerCase()}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="mb-3 col-span-full">
                <label className="mb-2 text-gray-400 font-semibold block w-full">
                  Photo de la perturbation ou des lieux
                </label>
                <input
                  {...register('file', { required: true })}
                  type={'file'}
                  multiple={true}
                />
              </div>

              <div className="mb-3">
                <label className="mb-2 text-gray-400 font-semibold block w-full">
                  Une entreprise est elle mise en cause ?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Checkbox
                    register={register}
                    name="type"
                    label="Oui"
                    type={'radio'}
                    value={Disruption_TYPE.PROFESSIONAL}
                  />
                  <Checkbox
                    register={register}
                    name="type"
                    label="Non"
                    type={'radio'}
                    value={Disruption_TYPE.INDIVIDUAL}
                  />
                </div>
              </div>

              <div
                className={`mb-3 ${
                  watch('type') === Disruption_TYPE.INDIVIDUAL
                    ? 'opacity-60'
                    : ''
                }`}
              >
                <label className="mb-2 text-gray-400 font-semibold block w-full">
                  Nom de l'entreprise concernées
                </label>
                <SearchInput
                  disabled={watch('type') !== Disruption_TYPE.PROFESSIONAL}
                  displayedProperty="companyName"
                  placeholder="Uber, Lime, ..."
                  options={companies}
                  selectedValue={watch('company')}
                  query={companyQuery}
                  setQuery={(value) => setCompanyQuery(value)}
                  handleSelectedOption={(value: string) =>
                    setValue('company', value)
                  }
                  handleAddNewOption={async (value) => {
                    // const newCompany = await postCompany(value)
                    // setValue('referent', newCompany)
                  }}
                />
              </div>

              <div className="mb-3 lg:col-span-2">
                <label className="mb-2 text-gray-400 font-semibold block w-full">
                  Type de véhicule
                </label>
                <div className="grid md:grid-cols-3 grid-cols-2 gap-2">
                  {(
                    Object.keys(VEHICULE_TYPE) as (keyof typeof VEHICULE_TYPE)[]
                  ).map((key, index) => (
                    <Checkbox
                      key={index}
                      register={register}
                      name="transportType"
                      label={VEHICULE_TYPE[key]}
                      type={'radio'}
                      value={VEHICULE_TYPE[key]}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-3 lg:col-span-2">
                <Textarea
                  register={register}
                  name="content"
                  label="Description de la perturbation (250 caractères minimum)"
                  placeholder="Décrivez les lieux, si une ou plusieurs personnes sont bléssées, ..."
                  rows={4}
                />
              </div>
            </>
          )}
          <div className="mt-6 col-span-2">
            <Button block variant="primary" disabled={!getValues('typology')}>
              Envoyer le dossier
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Newdisruption
