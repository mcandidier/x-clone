import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Avatar from './Avatar';

import { formatDistanceToNowStrict } from 'date-fns';
import { BiComment, BiLike } from 'react-icons/bi';
import _ from 'lodash';
import { useSelector } from 'react-redux';



import API from '@/libs/api';
import { fetchCurrentUser } from '@/hooks/fetchUser';

function PostItem(props) {
  const item = props.data;
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(null);
  const [data, setData] = useState(item);
  const auth = useSelector(state => state.auth);
  const userId = auth?.user? auth.user : auth.id;

  // const addItem = (newElement) => {
  //   const newItems = [...data.likes, newElement];
  //   setLikes({...data, likes: newItems });
  //   console.log(newItems, 'items')
  // };

  // const removeItem = (item) => {
  //   const newArray = _.without(data.likes, item);
  //   setLikes({...likes, likes: newArray}); // Use spread operator to create a new array with the added item
  // };

  const removeLike = (valueToRemove) => {
    const updatedLikes = data.likes.filter(like => like !== valueToRemove);
    setData(prevItem => ({
      ...prevItem,
      likes: updatedLikes
    }));
  };

  const insertLike = (valueToInsert) => {
    const updatedLikes = data.likes.concat(valueToInsert);
    setData(prevItem => ({
      ...prevItem,
      likes: updatedLikes
    }));
  };


  useEffect(() => {
    const isLike = _.includes(data.likes, userId);
    setIsLiked(isLike);
  },[data])

  const date_posted = new Date(data?.created_at);
  const createAt = formatDistanceToNowStrict(date_posted, {
    addSuffix: false
  });


  const handleLike = async (e) => {
    e.stopPropagation();
    const res = await API.post(`tweets/${data?.id}/likes/`);
    // addItem(userId);
    insertLike(userId)
    console.log('handle like')
  }

  const handeUnlike = async (e) => {
    e.stopPropagation();
    const res = await API.delete(`tweets/${data.id}/unlike/`);
    removeLike(userId)
  }

  const gotoPost = (e) => {
    router.push(`/posts/${data.id}`)
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
                <BiLike size={20} onClick={isLiked ? handeUnlike : handleLike}/>
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