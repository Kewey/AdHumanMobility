const API_URL = process.env.NEXT_PUBLIC_API_URL

export function getTypologies() {
  return fetch(`${API_URL}/typologies`)
}
