import axios from 'axios'

const API = axios.create({
  baseURL:
    'https://attendx-server-bon2.onrender.com/api'
})

export default API