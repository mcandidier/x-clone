import { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { parseCookies } from 'nookies';


function useWebsocket(url) {
    const [socket, setSocket] = useState(null);
    const cookies = parseCookies();
    const token = cookies.token;
    console.log(token, 'token')

    useEffect(() => {
        const newSocket = new ReconnectingWebSocket(url, {
            connectionTimeout: 1000,
            maxRetries: 10,
            headers: {
                authorization: token,
            },
        });

        setSocket(newSocket);

        newSocket.onmessage = event => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };

        return () => {
            newSocket.close();
        };

    }, []);

    if(socket) {
        socket.onopen = function() {
            console.log('WebSocket connection opened.');
        };
    }

    return {
        socket
    }
}

export default useWebsocket;

