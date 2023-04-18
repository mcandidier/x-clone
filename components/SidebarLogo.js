import React from 'react'
import { useRouter } from 'next/router';
import { BsTwitter } from 'react-icons/bs';


function SidebarLogo() {
  return (
    <div className='rounded-full h-14 w-12 p-2 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition text-white'>
        <BsTwitter></BsTwitter>
    </div>
  )
}

export default SidebarLogo