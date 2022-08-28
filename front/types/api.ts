export interface StrapiCall<T> {
  data: StrapiEntity<T>[]
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiEntity<T> {
  id: number
  attributes: T
}

export interface DefaultStrapyEntity {
  createdAt: string
  updatedAt: string
}

export function displayMedia(imageUrl: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`
}
