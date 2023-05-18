import React from 'react';


import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import { fetchUser } from '@/hooks/fetchUser';


function UserView() {
  const router = useRouter();
  const {userId} = router.query;

  const {data, isLoading, error} = fetchUser(userId);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log(data, 'data')
  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={42} />
      </div>
    )
  }


  return (
    <>
      <Header label='User Profile'/>
      {data?.bio}
    </>
  );
}

export default UserView;