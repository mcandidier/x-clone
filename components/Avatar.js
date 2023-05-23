import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BiBorderRadius } from 'react-icons/bi';

function Avatar({userId, hasBorder, profile, isLarge}) {

  const router = useRouter();

  const handleClick = () => {
    const url = `/users/${userId}`;
    router.push(url);
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
      <Image fill style={{
        objectFit: true,
        borderRadius: '100%',
      }}
      src={profile?.image || '/images/placeholder/user.png'}
      onClick={handleClick}
      />
      </div>
  )
} 

export default Avatar;