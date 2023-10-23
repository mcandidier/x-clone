import '@/styles/globals.css';
import Layout from '../components/layout';

import { Provider } from 'react-redux';
import store from '../store'; 

import { Toaster } from 'react-hot-toast';
import { parseCookies } from 'nookies';
import API from '@/libs/api';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import ReconnectingWebSocket from 'reconnecting-websocket';


import { setCurrentUser } from '@/store/user-slice'; 
import { updateNotification } from '@/store/notification-slice';
import PusherClient from '@/libs/pusher';


export default function App({ 
    Component, 
    pageProps: {...pageProps },
  }) {

  const cookies = parseCookies();
  const token = cookies.token;
  const state = store.getState()
  const notification =  state.notification;
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    if(!channel && token ) {
      const ChannelName = `channel-${token}`;
      PusherClient.connection.bind('connected', () =>{
      });
      const UserChannel = PusherClient.subscribe(ChannelName);
      setChannel(UserChannel);

      UserChannel.bind("pusher:subscription_succeeded", () => {
        console.log('connected to', ChannelName);
      });

      UserChannel.bind('new:notification', function(data) {
        console.log('new data alert', data)
        store.dispatch(updateNotification(data));
      });

      // const ws = new ReconnectingWebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/notifications/?token=${token}`);
      // ws.addEventListener('open', () => {
      //   console.log('WebSocket connection opened');
      // });

      // ws.addEventListener('message', (event) => {
      //   const data = JSON.parse(event.data);
      //   const dispatch = store.dispatch;
      //   dispatch(updateNotification(data));
      // });
    }

    return () => {
      if(channel) {
        channel.unsubscribe(`channel-${token}`)
        setChannel(null);
      }
    }
  }, [channel])

  if(token && !state.auth) {
    API.get('profiles/').then(res => {
      store.dispatch(setCurrentUser(res.data))
    });
  }

  return (
      <Provider store={store}>
        <Toaster/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
      </Provider>
  ) 
}