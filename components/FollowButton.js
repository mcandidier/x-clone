import React from 'react';
import Avatar from './Avatar';

function FollowButton() {
  const users = [{id:1, name: 'jay'},{id:2, name: 'kersu'}]
  
  return (
    <div className='px-6 py-4'>
        <div className='bg-neutral-800 rounded-xl p-3'>
            <h2 className='text-white text-md font-semi'>Who to follow</h2>

            <div className='flex flex-col gap-6 mt-4'>
                {users.map((user) => {
                  return <div key={user.id} className='flex flex-row gap-4'>
                        <Avatar userId={user.id} hasBorder={false} profile={user.name}/>
                        <div className='flex flex-col'>
                          <p className='text-white font-semibold text-sm'>
                            {user.name}
                          </p>
                          <p className='text-xs'>@{user.name}</p>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </div>
  )
}

export default FollowButton