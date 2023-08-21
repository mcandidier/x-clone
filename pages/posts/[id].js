import React from 'react';
import API from '@/libs/api';

import {useRouter} from 'next/router';

import PostItem from '@/components/PostItem';
import Header from '@/components/Header';

import CommentFeed from '@/components/CommentFeed';
import { useComments } from '@/hooks/useComments';



function post() {
  const router = useRouter();
  const {id} = router.query;
  const {data:comments} = useComments(id);

  return (
    <>
      <Header showBackArrow={true}></Header>
      <PostItem postId={id}></PostItem>
      <CommentFeed data={comments}></CommentFeed>
    </>
  )
}

export default post
