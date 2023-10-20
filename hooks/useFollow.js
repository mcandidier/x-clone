import { fetchCurrentUser } from "./fetchUser";
import { useMemo, useCallback } from "react";
import { toast } from "react-hot-toast";


import _ from 'lodash';
import API from "@/libs/api";

const useFollow = (userId) => {
    const {data: currentUser, mutate: mutatedUser} = fetchCurrentUser();

    const isFollowing = useMemo(() => {
        const isFollowed = _.includes(currentUser?.following, userId);
        return isFollowed;
    }, [currentUser?.following, mutatedUser]);

    const toggleFollow = useCallback( async() => {
        try {
            if(!isFollowing) {
                const res = await API.post(`/profiles/${userId}/follow/`, {'action': 'follow'});
            } else {
                const res = await API.delete(`/profiles/${userId}/unfollow/`);
            }

            mutatedUser();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong.');

        }
    }, [currentUser, isFollowing, mutatedUser]);

    return {
        isFollowing,
        toggleFollow,
        mutatedUser,
    }
}

export default useFollow;
