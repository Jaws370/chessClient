import React from 'react';
import { io, Socket } from 'socket.io-client';

const socketUrl: string = 'http://localhost:4000';

const socket: Socket = io(socketUrl, {
    transports: ['websocket'],
});

const SocketContext = React.createContext<Socket>(socket);

export default SocketContext;