import React from 'react';
import API from '@/libs/api';

import {useRouter} from 'next/router';

import PostItem from '@/components/PostItem';
import Header from '@/components/Header';


function post(postId) {
  const router = useRouter();
  const {id} = router.query;

  return (
    <>
      <Header showBackArrow={true}></Header>
      <PostItem postId={id}></PostItem>
    </>
  )
}

export default post
