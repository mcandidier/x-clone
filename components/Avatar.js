import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CommonDialog from './Modal';
import ChangeProfileImage from './users/ChangeProfileImage';
import { fetchUser } from '@/hooks/fetchUser';


const Avatar = (props) => {
  const { userId, hasBorder, isLarge, editMode } = props;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {data, mutate: mutateUser} = fetchUser(userId);

  const handleClick = (e) => {
    e.stopPropagation();
    const url = `/profile/${userId}`;
    router.push(url);
  }

  const changeProfPic = () => {
    setOpen(true);
  }

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        rounded-full
        hover:opacity-90
        transition
        cursor-pointer
        relative
        ${isLarge? 'w-24 h-24': 'w-9 h-9'}
      `}>

      {
        data?.avatar ? (
          <Image fill style={{
            objectFit: true,
            borderRadius: '100%',
          }}
          src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_HOST}${data.avatar}`}
          onClick={editMode? changeProfPic : handleClick}
          alt='avatar'
          />
        )
        :
        <Image fill style={{
          objectFit: true,
          borderRadius: '100%',
        }}
        src={'/images/placeholder/user.png'}
        onClick={editMode? changeProfPic : handleClick}
        alt='avatar'
        />
      }
      
      <CommonDialog
        setOpen={setOpen} 
        open={open}
        title='Upload Image'
        size='xs'
        component={<ChangeProfileImage setOpen={setOpen} mutate={mutateUser}/>}
      >
      </CommonDialog>
    </div>
  )
} 

export default Avatar;


