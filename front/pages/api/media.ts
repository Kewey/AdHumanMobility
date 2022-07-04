import fetch from 'isomorphic-fetch'
import { getSession } from 'next-auth/react'

// export async function uploadMedia(files: File) {
//   const { jwt } = await getSession()

//   const formData = new FormData()
//   formData.append('files', files)

//   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
//     method: 'Post',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'multipart/form-data',
//       Authorization: `Bearer ${jwt}`,
//     },
//     body: formData,
//   })
// }
