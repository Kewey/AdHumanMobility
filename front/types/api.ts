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
