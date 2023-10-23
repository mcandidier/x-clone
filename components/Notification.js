import React, {useMemo, useCallback, useState, useEffect} from 'react'
import Avatar from './Avatar'
import { formatDistanceToNowStrict } from 'date-fns';

import API from "@/libs/api";
import { updateObject } from '@/store/notification-slice';
import { useDispatch } from 'react-redux';

function Notification({data}) {
  const dispatch = useDispatch();

  const createAt = useMemo(() => {
    if(!data.created_at) return;
    return formatDistanceToNowStrict(new Date(data?.created_at), {
        addSuffix: false
    });
  },[data?.created_at]);


  const markasRead = useCallback( async() => {
    if(data.read) return;
    const objData = Object.assign({}, data);
    objData.read = true;

    API.post(`notifications/${data.id}/`).then(resp =>{
      dispatch(updateObject({ id: data.id, updatedData: objData}));
    });
  }, [data?.read])


  const unRead = useMemo(() => {
    return !!data.read
  }, [data.read])

  return (
    <>
        <div className={`
          flex flex-row gap-4 p-5 border-b-[1px]
           border-neutral-800 cursor-pointer items-center
           ${!data.read && 'bg-neutral-900 border-neutral-700' }`}
          onMouseEnter={markasRead}
          >
            <Avatar userId={data.action_user}/>
            <div>
                <div className='flex flex-row text-neutral-500 text-sm gap-2'>
                 <p className='text-white'>{data.message}</p>
                 <span>{createAt}</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notification


