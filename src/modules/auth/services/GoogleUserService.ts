import { apiGetUserToken } from 'actions/auth/apiGetUserToken'
import { initiateGoogleLoginAPI } from 'actions/auth/initGoogleAuth'

/**
 * User clicked to login to Google. Take user to external Google login page if account NOT already logged in. This should never get called when user already has JWT.
 * @returns true if account is already logged in
 */
export const googleLogin = async (jwt: string): Promise<boolean> => {
  const userToken = await apiGetUserToken({ jwt })
  const isLoggedIn = Boolean(userToken?.email)

  if (!isLoggedIn) {
    const authorizationUrl = (await initiateGoogleLoginAPI(jwt))
      .authorizationUrl
    window.location.href = authorizationUrl
    // window.open(authorizationUrl, '_blank') // Open user's new tab with external Twitter login page
  }

  return isLoggedIn
}

export type GoogleUser = {
  id: string
  googleUserID: string
  email: string
  googleProfilePic: string
}