import usePosts from '@/hooks/usePosts'
import React from 'react'
import PostItem from './PostItem'


function PostFeed({userId}) {
  const { data: posts} = usePosts(userId);
  return (
    <>
      {
        posts?.map(post => 
          <PostItem data={post}></PostItem>
        )
      }
    </>
    )
}

export default PostFeed
