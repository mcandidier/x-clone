import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import API from '@/libs/api';
import { parseCookies } from 'nookies';
import Avatar from '@/components/Avatar';

function Profile({data}) {
  const router = useRouter();
  const {id} = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>Profile {id} {data?.email}
    <Avatar userId={id} />
    </div>
  )
}

export default Profile;


export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.token;
  console.log('token', token);

  const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  API.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  );

  try {
    const response = await API.get(`${process.env.NEXT_PUBLIC_API_URL}/accounts/profile/`);
    const data = response.data;
    return { props: { data } };
  } catch (error) {
    return { props: { data: [] } };
  }
};