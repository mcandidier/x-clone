import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BiBorderRadius } from 'react-icons/bi';

function Avatar({userId, hasBorder, profile}) {

  const router = useRouter();

  const handleClick = () => {
    console.log('handle Click')
    const url = `/profile/${userId}`;
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
      `}>
      <Image fill style={{
        objectFit: true,
        borderRadius: '100%',
      }}
      src={profile?.image}
      onClick={handleClick}
      />
      test
      </div>
  )
} 

export default Avatar;