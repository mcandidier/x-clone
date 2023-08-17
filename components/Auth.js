import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';

import ReconnectingWebSocket from 'reconnecting-websocket';
import { useSelector, useDispatch } from 'react-redux';
import { updateNotification } from '@/store/notification-slice';


export const withAuthAndPermission = (PageComponent, permissions) => {
  const WrappedComponent = props => {
    const router = useRouter();
    const notification = useSelector(state => state.notification);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null)

    useEffect(() => {
      const cookies = parseCookies();
      const token = cookies.token;
      const isAuthenticated = token;

      // Redirect to login page if user is not authenticated
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // TODO
    //   // Check if user has required permissions
    //   if (!permissions.every(permission => userPermissions.includes(permission))) {
    //     router.push('/unauthorized');
    //     return;
    //   }

      if(!socket) {
        const ws = new ReconnectingWebSocket(`ws://localhost:8000/ws/notifications/?token=${token}`);
        ws.addEventListener('open', () => {
          console.log('WebSocket connection opened');
        });
  
        ws.addEventListener('message', (event) => {
          const data = JSON.parse(event.data);
          dispatch(updateNotification(data));
        });
      }

      return () => {
        if(socket) {
          socket.disconnect();
          setSocket(null);
        }
      };
      
    }, []);

    return <PageComponent {...props} />;
  };

  return WrappedComponent;
};