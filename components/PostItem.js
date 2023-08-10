import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Avatar from './Avatar';

import { formatDistanceToNowStrict } from 'date-fns';
import { BiComment, BiLike } from 'react-icons/bi';
import _ from 'lodash';
import { useSelector } from 'react-redux';



import API from '@/libs/api';
import { fetchCurrentUser } from '@/hooks/fetchUser';

function PostItem({data}) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(null);
  const [comment, setComment] = useState(data);
  const auth = useSelector(state => state.auth);
  const userId = auth.user? auth.user : auth.id;

  const addItem = (newElement) => {
    const newItems = [...comment.likes, newElement];
    setComment({ ...comment, likes: newItems });
  };

  const removeItem = (item) => {
    const newArray = _.without(comment.likes, item);
    setComment({...comment, likes: newArray}); // Use spread operator to create a new array with the added item
  };

  useEffect(() => {
    const isLike = _.includes(comment.likes, userId);
    setIsLiked(isLike);
  },[isLiked, comment ])

  const date_posted = new Date(data.created_at);
  const createAt = formatDistanceToNowStrict(date_posted, {
    addSuffix: false
  });


  const handleLike = async (e) => {
    e.stopPropagation();
    addItem(userId);
    const res = await API.post(`tweets/${data.id}/likes/`);
  }

  const handeUnlike = async (e) => {
    e.stopPropagation();
    const res = await API.delete(`tweets/${data.id}/unlike/`);
    removeItem(userId);
  }

  const gotoPost = (e) => {
    // e.stopPropagation()
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
          <Avatar userId={comment.user} hasBorder={false}/>
          <div>
            <div className='flex flex-row items-center gap-2 '>
              <p className='
              text-white semi-bold
              hover:underline
              cursor-pointer
              text-sm'
              >
                {comment.username}
              </p>
              <span className='
              text-neutral-500
              cursor-pointer
              hover:underline
              text-sm
              '>
              @{comment.username}
              </span>

              <span className='text-neutral-500 text-sm'>
                {createAt}
              </span>
            </div>
            <div className='flex flex-row text-white mt-1 '>
              {comment.content}
            </div>
            <div className='flex flex-row items-center mt-3 gap-10'>
              <div className='flex flex-row items-center gap-2 cursor-pointer text-neutral-500'>
                <BiComment size={20}/>
                <p>{1}</p>
              </div>
              <div className='flex flex-row items-center gap-2 cursor-pointer text-neutral-500'>
                <BiLike size={20} onClick={isLiked ? handeUnlike : handleLike}/>
                {data.likes.length !== 0 && (
                <p>{comment.likes.length}</p>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default PostItem