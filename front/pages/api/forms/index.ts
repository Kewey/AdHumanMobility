import { StrapiCall } from '../../../types/api'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function getTypologies() {
  return fetch(`${API_URL}/typologies?populate=*`)
}

export async function getCategoriesFromTypology(typologyId: string) {
  const res = await fetch(
    `${API_URL}/typologies/${typologyId}?populate[icon][fields][0]=url`
  )

  const {
    data: { attributes },
  } = (await res.json()) as StrapiCall<any>

  if (!attributes?.categories) {
    return []
  }

  return attributes.categories.data
}

export async function getSubCategoriesFromCategory(categoryId: string) {
  const res = await fetch(`${API_URL}/categories/${categoryId}?populate=%2A`)

  const {
    data: { attributes },
  } = (await res.json()) as StrapiCall<any>

  if (!attributes?.subCategories) {
    return []
  }

  return attributes.subCategories.data
}
