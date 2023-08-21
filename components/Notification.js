import React from 'react'
import Avatar from './Avatar'


function Notification({data}) {
  return (
    <>
        <div className='flex flex-row items-start gap-4 p-5 border-b-[1px] border-neutral-800'>
            <Avatar userId={data.user}/>
            <div>
                <div className='flex flex-row text-neutral-500 items-center'>
                    <p>{data.message}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notification