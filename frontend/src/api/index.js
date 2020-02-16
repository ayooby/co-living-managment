import axios from 'axios'
import { API_URL } from '../config';
import { makeUseAxios } from 'axios-hooks'

export const useApi = makeUseAxios({
  axios: axios.create({ 
    baseURL: API_URL,
    })
})
