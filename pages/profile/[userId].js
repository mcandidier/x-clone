import React, { useEffect, useState } from 'react';
import ErrorPage from 'next/error';

import Header from '@/components/Header';
import { useRouter } from "next/router";

import { ClipLoader } from 'react-spinners';

import { fetchUser } from '@/hooks/fetchUser';
import UserHero from '@/components/users/UserHero'
import UserBio from '@/components/users/UserBio';
import API from '@/libs/api';

function UserView({User}) {
  const router = useRouter();
  const {userId} = router.query; 

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
    </>
  );
}

export default UserView;

export async function getStaticPaths(ctx) {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: true //indicates the type of fallback
  }
}

export async function getStaticProps(ctx) {
  try {
    const { params: { userId } } = ctx;
    const fetchUser = await API.get(`users/${userId}/`);
    if (!fetchUser.data) {
        return {
            notFound: true
        };
    }
    return {
      props: {
          User: fetchUser.data,
      },
      revalidate: 60
    }
  } catch (error) {
    return {
      notFound: true
    }
  }

}