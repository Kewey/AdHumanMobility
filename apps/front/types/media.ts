export interface Media {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: string
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: string
  related: {
    data: [
      {
        id: string
        attributes: {}
      }
    ]
  }
  createdAt: string
  updatedAt: string
}
