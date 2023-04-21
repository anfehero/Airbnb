'use client'

import Image from "next/image"
function Avatar() {
  return (
    <div>
      <Image
        height={50}
        width={50}
        src={'/images/placeholder.jpg'}
        className=" rounded-full"
        alt="" />
    </div>
  )
}

export default Avatar