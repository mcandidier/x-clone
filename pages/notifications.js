import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Notification from '@/components/Notification';


import { useSelector } from 'react-redux';

function notifications() {

  const messages = useSelector((state) => state.notification);
  console.log(messages);

  const messageArray = messages.map((message) => {

    const jsonArray = JSON.parse(message);
    return jsonArray;
  })


  return (
    <>
      <Header label={'Notifications'}/>
      { messageArray.map( (message, key) => {
        return <Notification key={key} data={message}></Notification>
      })}
    </>
  )
}

export default notifications