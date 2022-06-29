export interface StrapiCall<T> {
  data: T
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

export function displayMedia(imageUrl: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`
}
