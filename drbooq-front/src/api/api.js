import axios from 'axios'


const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
headers: { 'Content-Type': 'application/json' },
// withCredentials: true // uncomment when using cookies
})


// attach token for Authorization header (demo)
api.interceptors.request.use((config) => {
try {
const raw = localStorage.getItem('docelle_token')
if (raw) config.headers.Authorization = `Bearer ${raw}`
} catch (e) {}
return config
})


export default api