import { GoogleUser } from 'modules/auth/services/GoogleUserService'
import React, { useState } from 'react'

interface GlobalContextState {
  jwtToken: null | string
  setJwtToken: (val: string) => void
  user: GoogleUser | null
  setUser: (val: any) => void
}

export const initialState: GlobalContextState = {
  jwtToken: null,
  setJwtToken: (val: string) => {},
  user: null,
  setUser: (val: GoogleUser) => {},
}

export const GlobalContext = React.createContext(initialState)

interface Props {}

export const GlobalContextComponent: React.FC<Props> = ({ children }: any) => {
  const [jwtToken, setJwtToken] = useState(null)
  const [user, setUser] = useState(null)

  return (
    <GlobalContext.Provider
      value={{
        jwtToken,
        setJwtToken,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
