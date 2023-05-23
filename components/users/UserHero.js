import React from 'react'
import { fetchUser } from '@/hooks/fetchUser';
import Image from 'next/image';
import Avatar from '../Avatar';


function UserHero({userId}) {
  const {data, error, isLoading}  = fetchUser(userId)
  return (
    <>
    <div className='bg-neutral-700 h-44 relative'>
      <div className='absolute -bottom-12 left-4 '>
        <Avatar userId={userId} isLarge/>   
      </div>
    </div>
    </> 
  )
}

export default UserHero