import { Media } from "../types/media"

export default {
  getMedia: (path: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}${path}`
  },
}
