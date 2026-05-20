import axios from 'axios'

const API = axios.create({
  baseURL:
  'https://attendx-server.onrender.com/api'
})

export default API