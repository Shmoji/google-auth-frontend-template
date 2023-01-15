import A from 'components/A'
import useAuth from '../hooks/useAuth'
import Image from 'next/image'
import { useContext } from 'react'
import { GlobalContext } from 'lib/GlobalContext'

export const ProfileTooltip = () => {
  const { user } = useContext(GlobalContext)
  const { googleLogout } = useAuth()

  // const onClickSettings = async () => {
  //   // if jwtToken is not present, then popup modal and MM popup to ask user to create account or sign in
  //   if (!jwtToken) {
  //     ModalService.open(CreateAccountModal, {})
  //     const isLoginSuccess = await onLoginClicked()
  //     ModalService.closeAll() // Get weird errors without this due to modal being closed inside CreateAccountModal in useEffect
  //     if (isLoginSuccess) {
  //       ModalService.open(ProfileSettingsModal)
  //     }

  //     return
  //   }

  //   ModalService.open(ProfileSettingsModal)
  // }

  const onClickDisconnectGoogle = async () => {
    googleLogout()
  }

  return (
    <div className="flex flex-col w-64 text-black">

      <A href={`/u/${user?.id}`}>
        <div className="cursor-pointer flex items-center py-3 px-4 border-t border-gray-100 hover:bg-gray-100">
          <div className="relative w-6 h-6">
            <Image
              src={'/icons8-google.svg'}
              alt="google-icon"
              layout="fill"
            />
          </div>
          <span className="ml-2 font-medium">My Profile</span>
        </div>
      </A>

      {/* {active && (
        <div
          className="cursor-pointer flex items-center py-3 px-4 border-t border-gray-100 hover:bg-brand-gray"
          onClick={onClickSettings}
        >
          <BiCog className="w-6 h-6  text-gray-400" />
          <span className="ml-2 font-medium">Edit Profile</span>
        </div>
      )} */}

      <div
        className="cursor-pointer flex items-center py-3 px-4 border-t border-gray-100 hover:bg-gray-100"
        onClick={onClickDisconnectGoogle}
      >
        <span className="ml-2 font-medium">Disconnect Google</span>
      </div>
    </div>
  )
}
