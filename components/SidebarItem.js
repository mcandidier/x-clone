import React from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';


function SidebarItem({label, href, icon: Icon, logout}) {
  const router = useRouter()
  const handleClick = () => {
    if(logout) {

      destroyCookie(null, 'token');
      destroyCookie(null, 'csrftoken');
      router.push('/login')
    } else {
      router.push(href)
    }
  }

  return (
    <div className='flex flex-row item-center cursor-pointer' onClick={handleClick}>
        <div className='
            relative
            rounded-full
            h-11
            w-11
            flex
            items-center
            justify-center
            p-2
            gap-2
            hover:bg-slate-300
            hover:bg-opacity-10
            transition
            duration-90'
            >
              {Icon}
        </div>
        <div className='flex justify-center items-center'>
          <p className='xs:hidden text-md text-white'>{label}</p>
        </div>
    </div> 
  )
}

export default SidebarItem