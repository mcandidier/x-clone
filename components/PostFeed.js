import {usePosts} from '@/hooks/usePosts'
import React from 'react'
import PostItem from './PostItem'


function PostFeed({userId}) {
  const { data: posts} = usePosts(userId);
  return (
    <>
      <div className='border-neutral-800 border-t-[1px]'>
      {
        posts?.map(post => 
          <PostItem key={post.id} postId={post.id}></PostItem>
        )
      }
      </div>
    </>
    )
}

export default PostFeed
