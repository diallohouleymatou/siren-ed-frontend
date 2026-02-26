const DEFAULT_BASE_URL = 'http://localhost:5000/api'

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
    const qs = new URLSearchParams(params).toString()
    return request(`/alerts${qs ? `?${qs}` : ''}`)
  },
  getAlert(id) {
    return request(`/alerts/${id}`)
  },
  createAlert(payload) {
    return request('/alerts', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  updateAlertStatus(id, status) {
    return request(`/alerts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  },
}
