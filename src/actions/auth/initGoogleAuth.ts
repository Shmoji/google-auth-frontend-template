import client from 'lib/axios'

type Response = {
  authorizationUrl?: string
}

/**
 *
 */
export const initiateGoogleLoginAPI = async (
  jwt: string
): Promise<Response> => {
  try {
    const response = await client.post(
      `/user-token/initiateGoogleLogin`,
      {},
      {
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : null,
        },
      }
    )
    return response?.data?.data?.googleVerification
  } catch (error) {
    console.error(
      `Could not generate access token for Google authentication`,
      error
    )
  }
}