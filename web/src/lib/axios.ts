import axios from "axios"

export const api = axios.create({
  baseURL: 'http://34.232.52.218:3333'
})