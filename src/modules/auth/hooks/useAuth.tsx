import { apiGetUserToken } from 'actions/auth/apiGetUserToken'
import { GlobalContext } from 'lib/GlobalContext'
import { deleteCookie } from 'modules/no-category/services/CookieService'
import { useContext } from 'react'

const useAuth = () => {
  const { setJwtToken, setUser } = useContext(GlobalContext)

  const setUserFromJwt = async (jwt: string) => {
    if (jwt) {
      const userToken = await apiGetUserToken({ jwt })
      if (userToken) {
        setUser(userToken)
      }
    }
  }

  const googleLogout = (): void => {
    deleteCookie('auth_token')
    setUser(null)
    setJwtToken(null)
  }

  return { setUserFromJwt, googleLogout }
}

export default useAuth
