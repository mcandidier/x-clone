import React, { useEffect, useState } from 'react'
import { fetchUser } from '@/hooks/fetchUser';
import Image from 'next/image';
import Avatar from '../Avatar';
import { useSelector } from 'react-redux';


function UserHero({userId}) {
  const {data, error, isLoading}  = fetchUser(userId)
  const currentUser = useSelector(state => state.auth);
  const [isLoggedInUser, setIsLoggedInUser] = useState(null);


  useEffect(() => {
    const uid = currentUser?.id? currentUser.id :currentUser?.user;
    const loggedIn = parseInt(uid) === parseInt(userId)
    setIsLoggedInUser(loggedIn);

  }, [userId, currentUser?.avatar])

  return (
    <>
    <div className='bg-neutral-700 h-44 relative'>
      <div className='absolute -bottom-12 left-4 '>
        <Avatar userId={userId} isLarge editMode={isLoggedInUser}/>   
      </div>
    </div>
    </> 
  )
}

export default UserHero