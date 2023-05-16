import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const fetchUser = (userId) => {
    const {data, error, isLoading, mutate} = useSWR(`api/users/${userId}/`)
}

return {
    data,
    error,
    isLoading,
    mutate
}

export default fetchUser;