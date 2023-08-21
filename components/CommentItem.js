import React, {useMemo} from 'react'
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from './Avatar';


function CommentItem({data}) {
  const createdAt = useMemo(() => {
    return formatDistanceToNowStrict(new Date(data.created_at))
  }, [data?.created_at]);



  return (
    <div
      className='
      border-b-[1px]
      border-neutral-800
      p-5
      cursor-pointer
      hover:bg-neutral-900
      transition'
    >
      <div className='flex flex-row items-start gap-3'>
        <Avatar userId={data.user}/>
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              className='text-white
                font-semibold
                cursor-pointer
                hover:underline
              '>{data.content}
              </p>
              <span
                className='text-neutral-500
                hover:undeline
                hidden
                md:block
                '>
                  @{data.username}
                </span>
              <span className='text-neutral-500 text-sm'>
                {createdAt}
              </span>
          </div>

          <div className='flex text-white text-sm mt-1'>
            <p>{data.content}</p>
          </div>
        </div>
        
      </div>
    </div>
    
  )
}

export default CommentItem