export interface StrapiCall<T> {
  data: StrapiEntity<T>
  meta?: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiCallArray<T> {
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

export interface StrapiError {
  data: []
  error: {
    details: StrapiDetailError
    message: string
    name: string
    status: number
  }
}

export interface StrapiDetailError {
  message: string
  name: string
  path: string[]
}
