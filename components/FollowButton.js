import React, { use, useEffect, useState } from 'react';
import Avatar from './Avatar';
import API from '@/libs/api';
import { useSelector } from 'react-redux';

function FollowButton() {

  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.auth)

  useEffect(() => {
    async function fetchData() {
      try {
            const response = await API.get('suggested/');
            const usersData = response.data;
            setUsers(usersData);
      } catch (error) {
        // Handle error, e.g., display an error message
        console.error('Error fetching data:', error);
      }
    }

    if(currentUser) {
      fetchData();
    }
  },[currentUser])

  return (
    <div className='px-6 py-4'>
        <div className='bg-neutral-800 rounded-xl p-3'>
            <h2 className='text-white text-md font-semi'>Who to follow</h2>

            <div className='flex flex-col gap-6 mt-4'>
                {users?.map((user) => {
                  return <div key={user.id} className='flex flex-row gap-4'>
                        <Avatar userId={user.id} hasBorder={false}/>
                        <div className='flex flex-col'>
                          <p className='text-white font-semibold text-sm'>
                            {user.username}
                          </p>
                          <p className='text-xs text-white'>@{user.username}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default FollowButton