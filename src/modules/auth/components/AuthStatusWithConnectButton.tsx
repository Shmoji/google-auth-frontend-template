import A from "components/A"
import { GlobalContext } from "lib/GlobalContext"
import Image from "next/image"
import { useContext, useState } from "react"
import { googleLogin } from "../services/GoogleUserService"
import { ProfileTooltip } from "./ProfileTooltip"

export default function AuthStatusWithConnectButton() {
  const { user } = useContext(GlobalContext)

  const [timerId, setTimerId] = useState(null)
  const [profileTooltipVisibility, setProfileTooltipVisibility] =
    useState<Boolean>(false)

  const onMouseLeaveProfileTooltip = () => {
    setTimerId(
      setTimeout(() => {
        setProfileTooltipVisibility(false)
      }, 200)
    )
  }

  const onMouseEnterProfileTooltip = () => {
    timerId && clearTimeout(timerId)
    user?.id && setProfileTooltipVisibility(true)
  }

  return (
    <>
      {!user?.id && (
        <>
          <div
            onClick={() => googleLogin(null)}
            className="relative h-10 z-[500] flex justify-center items-center px-4 py-2 ml-2 text-sm font-bold text-white rounded-xl bg-[#1DA1F2] rounded-xl cursor-pointer"
          >
            <div className="relative w-6 h-6">
              <Image
                src={'/icons8-google.svg'}
                alt="google-icon"
                layout="fill"
              />
            </div>
            <div className="ml-1">Connect Google</div>
          </div>
        </>
      )}

      {user && user?.id && (
        <div
          onMouseEnter={onMouseEnterProfileTooltip}
          onMouseLeave={onMouseLeaveProfileTooltip}
          className="flex items-center"
        >
          {profileTooltipVisibility && (
            <div className="absolute top-0 mt-10 right-0 mb-1 text-sm text-black rounded-xl shadow bg-white overflow-hidden">
              <ProfileTooltip />
            </div>
          )}
          <div
            // onClick={openWalletModal}
            className="flex items-center border rounded-3xl px-3 py-2"
          >
            <div className="relative w-6 h-6">
              <Image
                src={'/icons8-google.svg'}
                alt="google-icon"
                layout="fill"
              />
            </div>

            <div className="ml-3 text-gray-400 align-middle whitespace-nowrap hidden md:flex">
              {user?.email}
            </div>
          </div>

          <A
            href={
              user && user.id
                ? `/u/${
                    user && user.id
                      ? user.id
                      : ''
                  }`
                : '#'
            }
          >
            <button
              // onClick={active ? null : openWalletModal}
              className="flex items-center space-x-2 h-9 bg-white/[.1] hover:text-blue-500 text-sm font-semibold py-1 ml-2 rounded-lg"
            >
              <div className="ml-3 w-8 h-8 relative rounded-full bg-gray-400">
                <Image
                  src={(user as any)?.googleProfilePic || '/default-profile-pic.png'}
                  alt="Profile photo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </button>
          </A>
        </div>
      )}
    </>
  )
}
