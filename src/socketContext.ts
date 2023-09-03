import React from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000'); // Replace with your server URL

const SocketContext = React.createContext<Socket>(socket);

export default SocketContext;