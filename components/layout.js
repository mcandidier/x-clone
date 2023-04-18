import React from 'react'
import Sidebar from './Sidebar'
import FollowButton from './FollowButton';

function Layout({children}) {
  return (
    <div className='h-screen bg-black'>
        <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            <div className='grid grid-cols-4 h-full'>
                <Sidebar/>
                <div className='col-span-2 border-x border-cyan-800'>
                    {children}
                </div>
                <FollowButton/>
            </div>
        </div>
    </div>
  )
}

export default Layout