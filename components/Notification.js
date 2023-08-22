import React, {useMemo} from 'react'
import Avatar from './Avatar'
import { formatDistanceToNowStrict } from 'date-fns';


function Notification({data}) {

  const createAt = useMemo(() => {
    return formatDistanceToNowStrict(new Date(data?.created_at), {
        addSuffix: false
    });
  },[data?.created_at]);

  return (
    <>
        <div className='flex flex-row items-start gap-4 p-5 border-b-[1px] border-neutral-800'>
            <Avatar userId={data.action_user}/>
            <div>
                <div className='flex flex-row text-neutral-500 items-center text-sm gap-2'>
                 <p className='text-white'>{data.message}</p>
                 <span>{createAt}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notification