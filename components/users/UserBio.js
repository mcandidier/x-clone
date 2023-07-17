import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@mui/material';
import { BiCalendar } from 'react-icons/bi';

import CommonDialog from '../Modal';
import ModalUpdate from './ModalUpdate';

import { useSelector } from 'react-redux';
import { LoaderIcon } from 'react-hot-toast';


function UserBio({user}) {
  const currentUser = useSelector(state => state.auth);
  const [open, setOpen] = useState(false)
  const handleEdit = () => {
    setOpen(true)
  }

  if(!user & !currentUser) {
    return (
      <LoaderIcon/>
    )
  }

  return (
    <div className='border-b-[1px] border-neutral-800 pb-4 text-sm'>
      <div className='flex justify-end p-2'>
        { currentUser?.id === user?.user ? (
          <button 
            onClick={handleEdit}
            className='cursor-pointer rounded-full bg-white text-black font-semibold text-sm py-2 px-2'>
              Edit
            </button>
          ): (
          <button className='cursor-pointer rounded-full bg-white text-black font-semibold text-sm py-2 px-2'>Follow</button>
        )
         }
      </div>

      <div className='mt-6 px-4'>
        <div className='flex flex-col'>
          <p className='text-white text-xl font-semibold'>
            
          </p>
          <p className='text-md text-neutral-500'>
            @{user.username}
          </p>
        </div>
      </div>

      <div className="flex flex-col px-4">
        <div className='flex flex-row items-center text-neutral-500 gap-2 mt-4'>
          <BiCalendar size={24}> </BiCalendar>
          <p>Joined March 12 </p>
        </div>

        <div className='flex flex-row items-center mt-4 gap-6'>
          <div className='flex flex-row gap-2'>
              <p className='text-white'>
                {user.following}
              </p>
              <p className='text-neutral-500'>Following</p>
          </div>
          <div className='flex flex-row gap-2 '>
              <p className='text-white'>
                {user.followers}
              </p>
              <p className='text-neutral-500'>Followers</p>
          </div>
        </div>
        
      </div>
      <CommonDialog 
        setOpen={setOpen} 
        open={open}
        title='Update Profile'
        size='xs' 
        component={<ModalUpdate setOpen={setOpen}/>}>
      </CommonDialog>
    </div>
  )
}

export default UserBio 