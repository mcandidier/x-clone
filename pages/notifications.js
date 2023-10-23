import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Notification from '@/components/Notification';
import API from '@/libs/api';

import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

function notifications() {

  const [data, setData] = useState([])
  const notifications = useSelector((state) => state.notification);

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