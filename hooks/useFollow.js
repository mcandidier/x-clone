import { fetchCurrentUser } from "./fetchUser";
import { useMemo, useCallback } from "react";

import _ from 'lodash'

const useFollow = (userId) => {
    const {data: currentUser} = fetchCurrentUser();

    const isFollowing = useMemo(() => {
        const isFollowed = _.includes(currentUser?.following, userId);
        return isFollowed;
    }, [currentUser?.following]);

    const toggleFollow = useCallback( async() => {
        try {
            console.log('following')
        } catch (error) {
            console.log('error')
        }
    }, [currentUser, isFollowing]);

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;
