import useSWR from 'swr';
import API from '@/libs/api';

import _ from 'lodash';
import { useMemo, useCallback } from 'react';

import { toast } from 'react-hot-toast';

const fetcher = url => API.get(url).then(res => res.data)

const usePosts = (userId) => {
    const url = userId ? `tweets/${userId}/user/`: 'tweets';
    const {data, error, isLoading, mutate} = useSWR(url, fetcher)
    return { data, error, isLoading, mutate}
}

const usePost = (postId) => {
    if (!postId) {
        return {
            data: null,
            mutate: () => {}, // Placeholder function
            isLoading: false,
            error: null,
        };
    }

    const url = `/tweets/${postId}/`;
    const {data, error, isLoading, mutate} = useSWR(url, fetcher)
    return { data, error, isLoading, mutate}
}

const useLike = (postId, userId) => {
    const {data: post, mutate: mutatePost} = usePost(postId);

    const isLiked = useMemo(() => {
        const isLike = _.includes(post?.likes, userId);
        return isLike;
    }, [post?.likes]);

    const toggleLike = useCallback( async(e) => {
        e.stopPropagation();
        try {
            if(isLiked) {
                console.log('unlike');
                const res = await API.delete(`tweets/${postId}/unlike/`);
            } else {
                const res = await API.post(`tweets/${postId}/likes/`);
            }
            mutatePost();
        } catch (err) {
            toast.error('Something went wrong.');
        }

    },[isLiked]);

    return {
        isLiked,
        toggleLike
    }
}

export {
    usePosts,
    usePost,
    useLike
} 
