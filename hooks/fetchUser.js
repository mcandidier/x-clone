import useSWR from 'swr';
import API from '@/libs/api';

const fetcher = url => API.get(url).then(res => res.data)


const fetchUser = (userId) => {
    const {data, error, isLoading} = useSWR(`/users/${userId}/`, fetcher)
    return { data, error, isLoading}
}

const fetchCurrentUser = () => {
    const {data, error, isLoading} = useSWR(`/profiles/`, fetcher)
    return { data, error, isLoading}
}

export {
    fetcher,
    fetchUser,
    fetchCurrentUser
};