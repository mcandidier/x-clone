import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Notification from '@/components/Notification';
import API from '@/libs/api';

import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function notifications() {

  const messages = useSelector((state) => state.notification);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await API.get('notifications/');
        const notifications = response.data;
        setNotifications(notifications);
      } catch(err) {
        toast.error('Something went wrong.')
      }
    }

    const messageArray = messages.map((message) => {
      setNotifications([...notifications, message]);
    });

    fetchNotifications();
  },[messages]);
  

  return (
    <>
      <Header label={'Notifications'}/>
      { notifications.map( (message, key) => {
        return <Notification key={key} data={message}></Notification>
      })}
    </>
  )
}

export default notifications