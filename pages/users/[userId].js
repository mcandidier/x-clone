import React from 'react';


import Header from '@/components/Header';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

import { fetchUser } from '@/hooks/fetchUser';
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio';


function UserView() {
  const router = useRouter();
  const {userId} = router.query;

  const {data, isLoading, error} = fetchUser(userId);
  console.log(data)

  if (router.isFallback) {
    return <div>Loading...</div>;
  }


  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={42} />
      </div>
    )
  }

  return (
    <>
      <Header label={data?.bio}/>
      <UserHero/>
      <UserBio data={data}/>
    </>
  );
}

export default UserView;