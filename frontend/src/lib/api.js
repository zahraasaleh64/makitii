import axios from 'axios'
import i18n from '../i18n'

// '??' (pas '||') : une chaîne vide dans .env.production doit rester vide,
// afin que l'API soit appelée en relatif (même origine) une fois le
// frontend servi par Laravel.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    Accept: 'application/json',
  },
})

// Joint automatiquement le token d'authentification (stocké après connexion)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('makitii_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Si le token est invalide/expiré, on déconnecte proprement l'utilisateur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('makitii_token')
      localStorage.removeItem('makitii_user')
    }
    return Promise.reject(error)
  }
)

/**
 * Extrait un message d'erreur lisible depuis une réponse d'erreur Axios/Laravel.
 */
export function getErrorMessage(error, fallback = i18n.t('common.genericError')) {
  const data = error?.response?.data
  if (!data) return fallback

  if (data.errors) {
    const firstField = Object.values(data.errors)[0]
    if (Array.isArray(firstField) && firstField.length) return firstField[0]
  }

  return data.message || fallback
}

export default api
