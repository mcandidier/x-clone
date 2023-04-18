import React from 'react'
import { BshouseFill, BsBellFill, BsHouse, BsHouseFill} from 'react-icons/bs';
import { FaUser} from 'react-icons/fa';
import { BiLogOut} from 'react-icons/bi';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';


function Sidebar() {
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: <BsHouseFill/>
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: <BsBellFill/>
    },
    {
      label: 'Profile',
      href: '/profile/123',
      icon: <FaUser/>
    }
  ]
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
        <div className='flex flex-col items-end'>
          <div className='space-y-2 lg:w-[230px]'>
            <SidebarLogo />
            {items.map((item, id) => {
              return <SidebarItem key={id}
                href={item.href}
                label={item.label}
                icon={item.icon}/>
            })}
            <SidebarItem icon={<BiLogOut/>} label={'Logout'} href={'/logout'}></SidebarItem>
          </div>
          <div className='
                lg:w-[230px]
                sm:w-[120px]
                py-2
                px-4
                mt-6
                rounded-full
                bg-sky-500
                hover:bg-opacity-90
                cursor-pointer
                transition
              '>
                <p className='font-semibold flex justify-center align-center'>
                Tweet
                </p>
              </div>
        </div>
    </div>
  )
}

export default Sidebar