
'use client'

import { AiOutlineMenu } from "react-icons/ai"
import Avatar from "../Avatar"
import { useCallback, useState } from "react"
import MenuItem from "./MenuItem"

import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModal from "@/app/hooks/useLoginModal"
import RegisterModal from "../modals/RegisterModal"
import useRentModal from "@/app/hooks/useRentModal"

import { signOut } from "next-auth/react"
import { safeUser } from "@/app/types"

interface UserMenuProps {
  currentUser: safeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const LoginModal = useLoginModal()
  const rentModal = useRentModal()
  const registerModal = useRegisterModal()

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      return LoginModal.onOpen()
    }

    rentModal.onOpen()
  }, [currentUser, LoginModal, rentModal])


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-3xl hover:bg-neutral-100
          transition  cursor-pointer">
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row 
         items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>

      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw]
        md:w-3/4 bg-white overflow-y-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">

            {currentUser ? (

              <>
                <MenuItem onClick={() => { }}
                  label="My Trips" />

                <MenuItem onClick={() => { }}
                  label="My Favorites" />

                <MenuItem onClick={() => { }}
                  label="My Reservations" />

                <MenuItem onClick={() => { }}
                  label="My Properties" />

                <MenuItem onClick={rentModal.onOpen}
                  label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()}
                  label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={LoginModal.onOpen}
                  label="Login" />

                <MenuItem onClick={registerModal.onOpen}
                  label="Sign up" />
              </>
            )}
          </div>
        </div>
      )
      }
    </div >
  )
}

export default UserMenu