import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import API from '@/libs/api';


function Profile({user}) {
  const router = useRouter();
  const {id} = router.query;
  const [profile, setProfile ] = useState();

  useEffect(() => {
      const fetchProfile = async () => {
        const response = await API.get('/accounts/profile/');
        setProfile(response.data);
      }
      fetchProfile();
  },[])


  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>Profile {id} {profile?.email}</div>
  )
}

export default Profile;
