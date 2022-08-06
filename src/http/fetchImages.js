const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY

const url = "https://api.pexels.com/v1/search"
const queryParam = "animals"
let randomPage = Math.floor(Math.random() * 20) + 1

const fetchPexelsImages = async () => {
  const response = await fetch(
    `${url}?query=${queryParam}&per_page=12&page=${randomPage}`,
    {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    }
  )
  const data = await response.json()
  return data.photos
}

export default fetchPexelsImages
