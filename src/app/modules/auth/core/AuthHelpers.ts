import {AuthModel, UserModel} from './_models'
// import localStorage from 'react-secure-storage'
const AUTH_LOCAL_STORAGE_KEY = 'auth-admin-v'
const AUTH_LOCAL_STORAGE_USER_KEY = 'auth-admin'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }
  const lsValue: any = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }
  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}
const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }
  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}
const removeAuth = () => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}
const getUser = (): UserModel | undefined => {
  if (!localStorage) {
    return
  }
  const lsValue: any = localStorage.getItem(AUTH_LOCAL_STORAGE_USER_KEY)
  if (!lsValue) {
    return
  }
  try {
    const auth: UserModel = JSON.parse(lsValue) as UserModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}
const setUser = (auth: UserModel) => {
  if (!localStorage) {
    return
  }
  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_USER_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}
const setPageLimit = (limit: number) => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.setItem('PAGE_LIMIT', limit.toString())
    console.log(limit)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}
const getPageLimit = () => {
  if (!localStorage) {
    return
  }
  const lsValue: any = localStorage.getItem('PAGE_LIMIT')
  if (!lsValue) {
    return
  }
  try {
    const limit: any = JSON.parse(lsValue)
    if (limit) {
      // You can easily check auth_token expiration also
      return parseInt(limit)
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}
const removeUser = () => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_USER_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth()
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {
  getAuth,
  setAuth,
  removeAuth,
  AUTH_LOCAL_STORAGE_KEY,
  getUser,
  setUser,
  removeUser,
  AUTH_LOCAL_STORAGE_USER_KEY,
  setPageLimit,
  getPageLimit,
}
