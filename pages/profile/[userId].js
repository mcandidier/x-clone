import React, { useEffect, useState } from 'react';
import ErrorPage from 'next/error';

import Header from '@/components/Header';
import { useRouter } from "next/router";

import { ClipLoader } from 'react-spinners';

import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio';
import { useSelector } from 'react-redux';
import API from '@/libs/api';
import PostFeed from '@/components/PostFeed';
import { fetchUser } from '@/hooks/fetchUser';


function UserView() {
  const router = useRouter();
  const { userId } = router.query;

  const {data: User, mutate: mutateUser} = fetchUser(userId);

  if (!User) {
    return (
      <div className='flex justify-center items-center h-full'>
        <ClipLoader color='lightblue' size={42} />
      </div>
    )
  }

  return (
    <>
      <Header label={User?.bio}/> 
      <UserHero userId={userId}/>
      <UserBio user={User}/>
      <PostFeed userId={userId}></PostFeed>
    </>
  );
}

export default UserView;

// export async function getStaticPaths(ctx) {
//   return {
//       paths: [], //indicates that no page needs be created at build time
//       fallback: true //indicates the type of fallback
//   }
// }

// export async function getStaticProps(ctx) {
//   try {
//     const { params: { userId } } = ctx;
//     const fetchUser = await API.get(`users/${userId}/`);
//     if (!fetchUser.data) {
//         return {
//             notFound: true
//         };
//     }
//     return {
//       props: {
//           User: fetchUser.data,
//           userId: userId
//       },
//       revalidate: 60
//     }
//   } catch (error) {
//     return {
//       notFound: true
//     }
//   }

// }