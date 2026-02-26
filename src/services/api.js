const DEFAULT_BASE_URL = 'http://localhost:5017/api'

function getBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL
}

function getAuthToken() {
  return localStorage.getItem('access_token') || ''
}

async function request(path, options = {}) {
  const url = `${getBaseUrl()}${path}`
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }
  const token = getAuthToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { ...options, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `HTTP ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const api = {
  getMe() {
    return request('/me')
  },
  listAlerts(params = {}) {
    const hasStatus = typeof params.status !== 'undefined' && params.status !== null && params.status !== ''
    if (hasStatus) {
      return request(`/alert/by-status/${params.status}`)
    }
    return request('/alert/getAlert')
  },
  getAlert(id) {
    return request(`/alert/${id}`)
  },
  createAlert(payload) {
    return request('/alert/signalement', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  updateAlertStatus(id, status) {
    return request(`/alert/status/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ newStatus: status }),
    })
  },
}
