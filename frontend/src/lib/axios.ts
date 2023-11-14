import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333' //mudar para URL de prod*
})