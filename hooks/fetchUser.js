import useSWR from 'swr';
import API from '@/libs/api';

const fetcher = url => API.get(url).then(res => res.data)


const fetchUser = (userId) => {
    const {data, error, isLoading, mutate} = useSWR(`/users/${userId}/`, fetcher)
    return { data, error, isLoading, mutate}
}

const fetchCurrentUser = () => {
    const {data, error, isLoading, mutate} = useSWR(`/profiles/`, fetcher)
    return { data, error, isLoading, mutate}
}

export {
    fetcher,
    fetchUser,
    fetchCurrentUser
}