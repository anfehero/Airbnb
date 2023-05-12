'use client'

import Image from "next/image"

interface AvatarProps {
  src?: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <div>
      <Image
        height={50}
        width={50}
        src={ src || "/images/placeholder.jpg"}
        className=" rounded-full"
        alt="" 
        />
    </div>
  )
}

export default Avatar