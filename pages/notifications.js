import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { parseCookies } from 'nookies';


function notifications() {
  const [messages, setMessages] = useState([]);
  const cookies = parseCookies();
  const token = cookies.token;

//   useEffect(() => {

//   const socket = new ReconnectingWebSocket(`ws://localhost:8000/ws/notifications/?token=${token}`);

//   // socket.addEventListener('open', () => {
//   //   console.log('WebSocket connection opened');
//   // });

//   // socket.addEventListener('message', (event) => {
//   //   const data = JSON.parse(event.data);
//   //   console.log(data, 'data')
//   //   setMessages(messages => [...messages, data])

//   //   console.log(messages)
//   // });

//   return () => {
//     socket.close();
//   };

// }, [messages]);

  return (
    <>
        <div>notifications</div>
        { messages?.map( (message, key) => {
          return <p key={key}>{message}</p>
        })}
    </>

  )
}

export default notifications