import axios from "axios"

const BASE_URL = "http://127.0.0.1:8000"

export const getVoterById = async (voterId) => {
  const response = await axios.get(`${BASE_URL}/api/voters/${voterId}`)
  return response.data
}
