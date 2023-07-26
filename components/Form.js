import React, { use, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import {  toast } from 'react-hot-toast';
import API from '@/libs/api';
import usePosts from '@/hooks/usePosts';
import { set } from 'date-fns';

function Form({
    placeholder, 
    isComment,
    postId
}) {
    const user = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState(null);

    const { mutate: mutatePosts} = usePosts()    

    const handleOnChange = (e) => {
        setBody(e.target.value)

    }
    const onSubmit = useCallback( async () => {
        setLoading(true);
        try {
            const res = await API.post('tweets/', {'content': body});
            console.log(res, 'data');
            setBody('')
            toast.success('Tweet created.')
            mutatePosts(); 
        } catch (error) {
            setLoading(false)
            setBody('')
            toast.error('Somethin g went wrong.');
        } finally {
            setLoading(false);
            setBody('');
        }


    }, [body, mutatePosts]);


  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
        <div className='w-full'>
            <textarea
            className='
            disabled: opacity-80
            peer
            resize-none
            mt-3
            bg-black
            w-full
            outline-none
            text-[20px]
            placeholder-neutral-500
            text-white
            '
            placeholder={placeholder}
            value={body}
            onChange={handleOnChange}
            />
            <hr className='
            opacity-0
            peer-focus:opacity-100
            h-[1px]
            w- full
            border-neutral-8000
            transition
            '/>
            <div className='mt-4 flex flex-row justify-end'>
                <button
                    className='py-2 px-4 mt-6 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition
                    disabled: opacity-80
                    '
                label='Tweet' 
                disabled= {loading || !body}
                onClick={onSubmit}>
                    Tweet
                </button>
            </div>
        </div>
    </div>
  )
}

export default Form