import {usePosts} from '@/hooks/usePosts'
import React from 'react'
import PostItem from './PostItem'


function PostFeed({userId}) {
  const { data: posts} = usePosts(userId);
  return (
    <>
      {
        posts?.map(post => 
          <PostItem key={post.id} postId={post.id}></PostItem>
        )
      }
    </>
    )
}

export default PostFeed
