import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Button from '../../components/Button'
import Input from '../../components/form/Input'
import Layout from '../../components/Layout'
import Textarea from '../../components/form/Textarea'
import Checkbox from '../../components/form/Checkbox'
import { postDisturbance } from '../api/disturbances'
import {
  DisturbanceFormType,
  DISTURBANCE_TYPE,
  PRIORITY,
  VEHICULE_TYPE,
} from '../../types/disturbance'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import UploadPhotos from '../../components/form/Photos'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import dayjs from 'dayjs'
import {
  getCategoriesFromTypology,
  getCompanies,
  getSubCategoriesFromCategory,
  getTypologies,
  postCompany,
} from '../api/forms'
import { StrapiEntity } from '../../types/api'
import { Category, Subcategory, Typology } from '../../types/typology'
import { SearchInput } from '../../components/form/SearchInput'
import { Referent } from '../../types/company'
import { SearchGoogleMap } from '../../components/form/SearchGoogleMap'

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
  typologies: StrapiEntity<Typology>[]
}

function NewDisturbance({ typologies }: NewDisturbanceProps) {
  const [categories, setCategories] = useState<StrapiEntity<Category>[]>([])
  const [subCategories, setSubCategories] = useState<
    StrapiEntity<Subcategory>[]
  >([])
  const [companies, setCompanies] = useState<StrapiEntity<Referent>[]>([])
  const [companyQuery, setCompanyQuery] = useState('')

  const { register, handleSubmit, control, setValue, getValues, watch } =
    useForm<DisturbanceFormType>({})
  const router = useRouter()

  const { data: session } = useSession()

  const {
    value: locationQuery,
    setValue: setLocationQuery,
    suggestions: { data: localisationOptions },
  } = usePlacesAutocomplete({
    debounce: 300,
    requestOptions: {
      region: 'fr',
      language: 'fr',
    },
  })

  useEffect(() => {
    const subscription = watch(async (value, { name }) => {
      console.table(value)
      switch (name) {
        case 'typology':
          const categories = await getCategoriesFromTypology(value[name] || '')
          setCategories(categories)
          setValue('subCategory', '')
          return

        case 'category':
          const subCategories = await getSubCategoriesFromCategory(
            value[name] || ''
          )
          setSubCategories(subCategories)
          setValue('subCategory', '')
          return
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    async function getCompany() {
      const companies = await getCompanies(companyQuery)
      setCompanies(companies)
    }

    getCompany()
  }, [companyQuery])

  const onLocationUpdate = async ({
    place_id: placeId,
  }: Partial<google.maps.GeocoderResult>) => {
    const [res] = await getGeocode({ placeId })
    const { lat, lng } = await getLatLng(res)
    setValue('latitude', lat)
    setValue('longitude', lng)
  }

  /*

  SUBMIT
  
  */

  const onSubmit = async (data: DisturbanceFormType) => {
    const body = { ...data, author: session?.id?.toString() || '' }

    try {
      await postDisturbance(body)
      // router.back()
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
            <label className="mb-2 text-gray-400 font-semibold block w-full">
              Choissiez une typologie
            </label>
            <div className="grid md:grid-cols-3 gap-2">
              {typologies?.map((typology, index) => (
                <Checkbox
                  key={index}
                  iconUrl={typology.attributes?.icon?.data?.attributes?.url}
                  register={register}
                  name="typology"
                  label={typology.attributes.label}
                  type={'radio'}
                  value={typology.id.toString()}
                />
              ))}
            </div>
          </div>

          {categories.length > 0 ? (
            <div className="col-span-full">
              <label className="mb-2 text-gray-400 font-semibold block w-full">
                Choissiez une catégorie
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                {categories?.map((category, index) => (
                  <Checkbox
                    key={index}
                    iconUrl={category.attributes?.icon?.data?.attributes?.url}
                    register={register}
                    name="category"
                    label={category.attributes.label}
                    type={'radio'}
                    value={category.id.toString()}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-full opacity-70">
              <label className="mb-2 text-gray-400 font-semibold block w-full">
                Choissiez une catégorie
              </label>
              <div className="grid md:grid-cols-3 gap-2">faux block</div>
            </div>
          )}

          {subCategories.length > 0 ? (
            <div className="col-span-full">
              <label className="mb-2 text-gray-400 font-semibold block w-full">
                Choissiez une sous catégorie
              </label>
              <div className="grid md:grid-cols-3 gap-2">
                {subCategories?.map((subCategory, index) => (
                  <Checkbox
                    key={index}
                    iconUrl={
                      subCategory.attributes?.icon?.data?.attributes?.url
                    }
                    register={register}
                    name="subCategory"
                    label={subCategory.attributes.label}
                    type={'radio'}
                    value={subCategory.id.toString()}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="col-span-full opacity-70">
              <label className="mb-2 text-gray-400 font-semibold block w-full">
                Choissiez une sous catégorie
              </label>
              <div className="grid md:grid-cols-3 gap-2">faux block</div>
            </div>
          )}

          <div className="mb-3">
            <label className="mb-2 text-gray-400 font-semibold block w-full">
              Lieu de la perturbation
            </label>
            <Controller
              control={control}
              name="location"
              render={({ field: { value: fieldValue, onChange } }) => (
                <SearchGoogleMap
                  query={locationQuery}
                  setQuery={setLocationQuery}
                  options={localisationOptions}
                  selectedValue={fieldValue}
                  handleSelectedOption={(selectedOption) => {
                    onLocationUpdate(selectedOption)
                    onChange(selectedOption.description)
                  }}
                />
              )}
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
            <Input
              register={register}
              name="disturbanceAt"
              label="Date de la perturbation"
              type="datetime-local"
              max={dayjs().format('YYYY-MM-DDTHH:mm')}
            />
          </div>

          <div className="mb-3 lg:col-span-2">
            <label className="mb-2 text-gray-400 font-semibold block w-full">
              Priorité de la perturbation
            </label>
            <div className="grid grid-cols-3 gap-2">
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

          {/* PHOTO TODO */}
          <div className="mb-3 col-span-full">
            <label className="mb-2 text-gray-400 font-semibold block w-full">
              Photo de la perturbation ou des lieux
            </label>
            <Controller
              control={control}
              name="evidences"
              render={({ field: { value: fileValue, onChange } }) => (
                <>
                  <UploadPhotos handleSelectedFiles={onChange} />
                  {fileValue?.length > 0 &&
                    `${fileValue.length} fichiers sélectionnés`}
                </>
              )}
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
                value={DISTURBANCE_TYPE.PROFESSIONAL}
              />
              <Checkbox
                register={register}
                name="type"
                label="Non"
                type={'radio'}
                value={DISTURBANCE_TYPE.INDIVIDUAL}
              />
            </div>
          </div>

          <div
            className={`mb-3 ${
              watch('type') === DISTURBANCE_TYPE.INDIVIDUAL ? 'opacity-60' : ''
            }`}
          >
            <label className="mb-2 text-gray-400 font-semibold block w-full">
              Nom de l'entreprise concernées
            </label>
            <SearchInput
              disabled={watch('type') === DISTURBANCE_TYPE.INDIVIDUAL}
              displayedProperty="companyName"
              placeholder="Uber, Lime, ..."
              options={companies}
              selectedValue={getValues('referent') || ''}
              query={companyQuery}
              setQuery={(value) => setCompanyQuery(value)}
              handleSelectedOption={(value: StrapiEntity<Referent>) =>
                setValue('referent', value.id.toString())
              }
              handleAddNewOption={async (value) => await postCompany(value)}
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
                  name="car_type"
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
