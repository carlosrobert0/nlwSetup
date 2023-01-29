import axios from "axios"

const { 
  VITE_API_URL
} = import.meta.env


export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production'
  ? VITE_API_URL
  : 'http://localhost:3333'
})