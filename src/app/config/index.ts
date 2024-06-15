export const API_BASE_URL = getEnvVar('VITE_APP_API_BASE_URL');
export const API_PROTOCOL = getEnvVar('VITE_APP_API_PROTOCOL');
export const APP_HOST = getEnvVar('VITE_APP_API_HOST');
export const AUTH_SBER_URL= getEnvVar('VITE_APP_AUTH_SBER_URL');
export const STATIC_URL = API_PROTOCOL + '://' + APP_HOST;

function getEnvVar(key: string) {
    const envVar = import.meta.env[key]
    if (envVar === undefined) {
      throw new Error(`Env variable ${key} is required`)
    }
    return envVar
  }