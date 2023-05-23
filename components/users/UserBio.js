import React from 'react';
import { format } from 'date-fns';
import { Button } from '@mui/material';
import { BiCalendar } from 'react-icons/bi';

function UserBio({user}) {

  // todo: return date joined in api
  const currentUser = {id: 1}
  return (
    <div className='border-b-[1px] border-neutral-800 pb-4 text-sm'>
      <div className='flex justify-end p-2'>
        <Button secondary label='Follow'></Button>
        { currentUser?.id === user?.id ? (
          <button onClick={() => {}}>Edit</button>
        ): (
          <button className='rounded-3xl  bg-white text-black font-semibold text-sm py-2 px-2'>Follow</button>

        )
         }
      </div>

      <div className='mt-6 px-4'>
        <div className='flex flex-col'>
          <p className='text-white text-xl font-semibold'>
            Username here
          </p>
          <p className='text-md text-neutral-500'>
            @Username
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
                0
              </p>
              <p className='text-neutral-500'>Following</p>
          </div>
          <div className='flex flex-row gap-2 '>
              <p className='text-white'>
                0
              </p>
              <p className='text-neutral-500'>Followers</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default UserBio