import React, { use, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

import {  toast } from 'react-hot-toast';
import API from '@/libs/api';
import {usePosts} from '@/hooks/usePosts';
import { set } from 'date-fns';

import { usePost } from '@/hooks/usePosts';
import { useComments } from '@/hooks/useComments';

function Form({
    placeholder, 
    isComment,
    postId,
    setOpen
}) {
    
    const user = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [body, setBody] = useState('');

    const { mutate: mutatePosts} = usePosts();
    const { mutate: mutateComments}  = useComments(postId);

    const handleOnChange = (e) => {
        setBody(e.target.value)

    }
    const onSubmit = useCallback( async () => {
        setLoading(true);
        try {
            if(!isComment && !postId) {
                const res = await API.post('tweets/', {'content': body});
                toast.success('Tweet created.')
            } else {
                const res = await API.post(`/comments/`, {'content': body, 'tweet': postId});
                toast.success('Comment created.')
            }
            mutatePosts(); 
            mutateComments();
            setBody('')
            if(setOpen) {
              setOpen(false);
            }
        } catch (error) {
            setLoading(false)
            setBody('')
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
            setBody('');
        }

    }, [body, mutatePosts, usePost, mutateComments]);


  return (
    <div className='border-neutral-800 px-5 py-3'>
        <div className='w-full'>
            <textarea
            className={`
            disabled: opacity-80
            peer
            resize-none
            mt-3
            bg-black
            w-full
            outline-none
            text-[18px]
            placeholder-neutral-500
            text-white
           
            `}
            placeholder={placeholder}
            value={body}
            onChange={handleOnChange}
            />
            
            <hr className={`
            ${setOpen ? 'opacity-100': 'opacity-0'}
            peer-focus:opacity-100
            h-[1px]
            w- full
            border-neutral-800
            transition
            `}/>
            <div className='mt-4 flex flex-row justify-end'>
                <button
                    className='py-2 px-4 mt-6 rounded-full bg-sky-500 hover:bg-opacity-90 cursor-pointer transition
                    disabled: opacity-80
                    '
                label='Tweet' 
                disabled= {loading || !body}
                onClick={onSubmit}>
                    {isComment? 'Reply': 'Tweet'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Form