import useSWR from 'swr';
import API from '@/libs/api';

const fetcher = url => API.get(url).then(res => res.data)


const usePosts = (userId) => {

    const url = userId ? `${userId}/tweets`: 'tweets';

    const {data, error, isLoading, mutate} = useSWR(url, fetcher)
    return { data, error, isLoading, mutate}
}

export default usePosts;
