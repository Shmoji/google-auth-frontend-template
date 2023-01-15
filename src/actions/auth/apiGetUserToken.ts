import client from 'lib/axios'

type Response = {
  id?: string
  googleUserID?: string
  email?: string
  googleProfilePic?: string
}

/**
 * Get user token
 * @param email -- email to fetch data for
 */
export const apiGetUserToken = async ({
  email = null,
  jwt = null,
}): Promise<Response> => {
  if (!email && !jwt) return null

  try {
    const response = await client.get(`/user-token/single`, {
      params: {
        email,
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    return response?.data?.data?.userToken
  } catch (error) {
    console.error(`apiGetUserToken failed`)
    return null
  }
}
