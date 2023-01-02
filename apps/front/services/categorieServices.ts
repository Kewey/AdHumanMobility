import { StrapiCall, StrapiCallArray, StrapiEntity } from '../types/api'
import { Referent } from '../types/referent'
import { Category, Typology } from '../types/typology'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function getTypologies() {
  return fetch(`${API_URL}/typologies?populate=*`)
}

export async function getCategoriesFromTypology(typologyId: string) {
  const res = await fetch(
    `${API_URL}/typologies/${typologyId}?populate[categories][populate][0]=icon`
  )

  const {
    data: { attributes },
  }: { data: StrapiEntity<Typology> } = await res.json()

  if (!attributes?.categories) {
    return []
  }

  return attributes.categories.data
}

export async function getSubCategoriesFromCategory(categoryId: string) {
  const res = await fetch(`${API_URL}/categories/${categoryId}?populate=*`)

  const {
    data: { attributes },
  }: { data: StrapiEntity<Category> } = await res.json()

  if (!attributes?.sub_categories) {
    return []
  }

  return attributes.sub_categories.data
}

export async function getCompanies(query: string) {
  const res = await fetch(
    `${API_URL}/referents?publicationState=preview&filters[companyName][$containsi]=${query}`
  )

  const { data }: StrapiCallArray<Referent> = await res.json()

  return data
}

export async function postCompany(
  name: string
): Promise<StrapiEntity<Referent>> {
  const res = await fetch(`${API_URL}/referents`, {
    method: 'POST',
    body: JSON.stringify({ data: { companyName: name, publishedAt: null } }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  })

  const { data } = await res.json()

  return data
}
