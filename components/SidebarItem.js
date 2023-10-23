import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { resetUser } from '@/store/user-slice';
import { useDispatch, useSelector } from 'react-redux';

function SidebarItem({label, href, icon: Icon, logout}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const messages = useSelector(state => state.notification);
  const hasNoti = messages.some(obj => obj.read === false);

  const handleClick = () => {
    if(logout) {
      destroyCookie(null, 'token');
      destroyCookie(null, 'csrftoken');
      dispatch(resetUser());
      router.push('/login');
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
              {label === 'Notifications' && hasNoti && (
                <div className="absolute gap-0 left-auto top-3 right-3.5 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 rounded-full bg-red-600 p-1.5 text-xs"></div>
              )} 
        </div>
        <div className='flex justify-center items-center relative'>

          <p className='xs:hidden text-md text-white'>{label}
          </p>

        </div>



    </div>
  )
}

export default SidebarItem