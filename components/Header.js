import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';


function Header({label, showBackArrow}) {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className='border-b border-neutral-800 p-5'>
      <div className='flex flex-row items-center gap-2'>
        { showBackArrow && (
          <BiArrowBack 
            color='white'
            size={20}
            onClick={handleBack}
            className='cursor-pointer hover:opacity-70 transtion'/>
        )}
        {label}
      </div>
    </div>
  )
}

export default Header