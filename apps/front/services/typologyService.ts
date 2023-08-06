import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Referent } from '../types/referent'
import { Typology } from '../types/typology'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

async function getAll(
  params = {}
): Promise<{ typologies: Typology[]; totalItems: number }> {
  const {
    data: { 'hydra:member': typologies, 'hydra:totalItems': totalItems },
  } = await axios(`/typologies`, {
    params,
  })

  return { typologies, totalItems }
}

async function get(typologyId = '', params = {}): Promise<Typology> {
  const session = await getSession()

  const { data: typologies } = await axios(`/typologies/${typologyId}`, {
    params,
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  })

  return typologies
}

async function getTypologyChildren(
  typologyId = '1',
  params = {}
): Promise<{ typologies: Typology[]; totalItems: number }> {
  const session = await getSession()

  if (!session) {
    return { typologies: [], totalItems: 0 }
  }

  const {
    data: { 'hydra:member': typologies, 'hydra:totalItems': totalItems },
  } = await axios(`/typologies/${typologyId}/children`, {
    params: {
      ...params,
    },
    headers: {
      Authorization: `Bearer ${session?.user.token}`,
    },
  })

  return { typologies, totalItems }
}

async function getCategoriesFromTypology(
  typologyId = '',
  params = {}
): Promise<Typology[]> {
  const { data: typology } = await axios(`/typologies/${typologyId}`, {
    params,
  })
  return typology.children
}

async function getSubCategoriesFromCategory(
  typologyId = '',
  params = {}
): Promise<Typology[]> {
  const { data: category } = await axios(`/typologies/${typologyId}`, {
    params,
  })
  return category.children
}

// async function getCategoriesFromTypology(typologyId: string) {
//   const res = await fetch(
//     `${API_URL}/typologies/${typologyId}?populate[categories][populate][0]=icon`
//   )

//   const {
//     data: { attributes },
//   }: { data: StrapiEntity<Typology> } = await res.json()

//   if (!attributes?.categories) {
//     return []
//   }

//   return attributes.categories.data
// }

// async function getSubCategoriesFromCategory(categoryId: string) {
//   const res = await fetch(`${API_URL}/categories/${categoryId}?populate=*`)

//   const {
//     data: { attributes },
//   }: { data: StrapiEntity<Category> } = await res.json()

//   if (!attributes?.sub_categories) {
//     return []
//   }

//   return attributes.sub_categories.data
// }

// async function getCompanies(query: string) {
//   const res = await fetch(
//     `${API_URL}/referents?publicationState=preview&filters[companyName][$containsi]=${query}`
//   )

//   const { data }: StrapiCallArray<Referent> = await res.json()

//   return data
// }

// async function postCompany(name: string): Promise<StrapiEntity<Referent>> {
//   const res = await fetch(`${API_URL}/referents`, {
//     method: 'POST',
//     body: JSON.stringify({ data: { companyName: name, publishedAt: null } }),
//     headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
//   })

//   const { data } = await res.json()

//   return data
// }

export default {
  get,
  getAll,
  getTypologyChildren,
  getCategoriesFromTypology,
  getSubCategoriesFromCategory,
}
