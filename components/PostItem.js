import React from 'react'
import { useRouter } from 'next/router'
import Avatar from './Avatar';

import { formatDistanceToNowStrict } from 'date-fns';
import { BiComment, BiLike } from 'react-icons/bi';

function PostItem({data}) {
  const router = useRouter();

  // console.log(data.created_at)

  const date_posted = new Date(data.created_at);
  const createAt = formatDistanceToNowStrict(date_posted, {
    addSuffix: false
  });


  const gotoPost = () => {
    router.push(`posts/${data.id}`)
  }
  return (
    <div
      onClick={gotoPost}
      className='
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
      '>
        <div className='
        flex
        flex-row
        items-start
        gap-4'>

                <Avatar userId={data.user} hasBorder={false}/>
                <div>
                  <div className='flex flex-row items-center gap-2 '>
                    <p className='
                    text-white semi-bold
                    hover:underline
                    cursor-pointer
                    text-sm'
                    >
                      {data.username}
                    </p>
                    <span className='
                    text-neutral-500
                    cursor-pointer
                    hover:underline
                    text-sm
                    '>
                    @{data.username}
                    </span>

                    <span className='text-neutral-500 text-sm'>
                      {createAt}
                    </span>
                  </div>
                  <div className='flex flex-row text-white mt-1 '>
                    {data.content}
                  </div>
                  <div className='flex flex-row items-center mt-3 gap-10'>
                    <div className='flex flex-row items-center gap-2 cursor-pointer text-neutral-500'>
                      <BiComment size={20}/>
                      <p>{1}</p>
                    </div>
                    <div className='flex flex-row items-center gap-2 cursor-pointer text-neutral-500'>
                      <BiLike size={20}/>
                      {data.likes.length !== 0 && (
                      <p>{data.likes.length}</p>
                      )}
                    </div>
                  </div>
                </div>
         </div>
        
    </div>
  )
}

export default PostItem