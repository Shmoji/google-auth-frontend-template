import { GlobalContext } from './GlobalContext'
import { useContext, useEffect } from 'react'
import { getCookie } from 'modules/no-category/services/CookieService'
import useAuth from 'modules/auth/hooks/useAuth'

export const ClientWrapper = ({ children }: any) => {
  const { setJwtToken } = useContext(GlobalContext)

  const { setUserFromJwt } = useAuth()

  useEffect(() => {
    const initUserData = async () => {
      const jwtValue = getCookie('auth_token') || null
      console.log('jwtValue==', jwtValue)

      // If there is JWT (they are signed in or faking it), then fetch user data using JWT
      if (jwtValue) {
        await setUserFromJwt(jwtValue)
        setJwtToken(jwtValue)
      }
    }

    initUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
