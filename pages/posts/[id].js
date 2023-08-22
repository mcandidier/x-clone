import React from 'react';
import API from '@/libs/api';

import {useRouter} from 'next/router';

import PostItem from '@/components/PostItem';
import Header from '@/components/Header';

import CommentFeed from '@/components/CommentFeed';
import { useComments } from '@/hooks/useComments';
import Form from '@/components/Form';


function post() {
  const router = useRouter();
  const {id} = router.query;
  const { data:comments, isLoading, error } = useComments(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header showBackArrow={true}></Header>
      <PostItem postId={id}></PostItem>
      <Form placeholder={'Post your comment'} postId={id} isComment={true}/>
      <CommentFeed data={comments}></CommentFeed>
    </>
  )
}

export default post

