import Header from '@/components/Header';
import { useRouter } from 'next/router';
import React from 'react';
import { ClipLoader } from 'react-spinners';

function UserView() {
  const router = useRouter();
  const {userId} = router.query;
  console.log(router.query)
  console.log(userId, 'userID')

  // const {data, isLoading} = fetchUser(userId);
  // console.log(data, isloading)

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (true) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={42} />
      </div>
    )
  }


  return (
    <>
      <Header label='User Profile'/>
    </>
  );
}

export default UserView;