import axios from 'axios'

export const api = axios.create({
  baseURL: "http://10.3.152.32:3333"
})