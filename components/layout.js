import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';


import Sidebar from './Sidebar'
import FollowButton from './FollowButton';
import Form from './Form';
import CommonDialog from './Modal';
import API from '@/libs/api';
import { setNotifications } from '@/store/notification-slice';
import { toast } from 'react-hot-toast';


function Layout({children}) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await API.get('notifications/');
        const notifications = response.data;
        dispatch(setNotifications(notifications));
      } catch(err) {
        toast.error('Something went wrong.')
      }
    }

    fetchNotifications();

  }, []);


  return (
    <>
    <CommonDialog open={open} setOpen={setOpen} component={<Form setOpen={setOpen}></Form>} title={'Post a Tweet'}/>
    <div className='h-screen bg-black'>
        <div className='container h-full mx-auto xl:px-30 max-w-6xl'>
            <div className='grid grid-cols-4 h-full'>
                <Sidebar setOpen={setOpen}/>
                <div className='col-span-2 border-x border-cyan-800'>
                  {children}
                </div>
                <FollowButton/>
            </div>
        </div>
    </div>
    </>

  )
}

export default Layout