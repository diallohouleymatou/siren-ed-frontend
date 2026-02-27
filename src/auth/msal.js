import { PublicClientApplication } from '@azure/msal-browser'

const clientId = import.meta.env.VITE_AZURE_CLIENT_ID || ''
const tenantId = import.meta.env.VITE_AZURE_TENANT_ID || ''
const redirectUri = import.meta.env.VITE_AZURE_REDIRECT_URI || window.location.origin
const scope = import.meta.env.VITE_AZURE_SCOPE || ''

let msalInstance = null
let initialized = false

function isConfigured() {
  return Boolean(clientId && tenantId && scope)
}

function getInstance() {
  if (!msalInstance) {
    msalInstance = new PublicClientApplication({
      auth: {
        clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri,
      },
      cache: {
        cacheLocation: 'sessionStorage',
      },
    })
  }
  return msalInstance
}

export async function initializeMsal() {
  if (!isConfigured()) return false
  if (initialized) return true

  const instance = getInstance()
  await instance.initialize()
  await instance.handleRedirectPromise()
  initialized = true
  return true
}

export async function ensureAccessToken() {
  if (!isConfigured()) return null

  const instance = getInstance()
  const accounts = instance.getAllAccounts()

  if (!accounts.length) {
    await instance.loginRedirect({ scopes: [scope] })
    return null
  }

  const token = await instance.acquireTokenSilent({
    account: accounts[0],
    scopes: [scope],
  })

  return token.accessToken
}

export function isAuthConfigured() {
  return isConfigured()
}
