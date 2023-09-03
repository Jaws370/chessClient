import React from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

const SocketContext = React.createContext(socket);

export default SocketContext;