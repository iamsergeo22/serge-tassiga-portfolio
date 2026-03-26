// app/utils/cookies.ts
export function getCookieConsent() {
  if (typeof window === 'undefined') {
    return null
  }
  
  const consent = localStorage.getItem('cookies-consent')
  if (!consent) return null
  
  try {
    return JSON.parse(consent)
  } catch {
    return null
  }
}

export function canLoadScript(scriptType: 'analytics' | 'marketing' | 'functional') {
  const consent = getCookieConsent()
  if (!consent) return false
  
  return consent[scriptType] === true
}