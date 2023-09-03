import React, { useState, useEffect } from 'react';
import SocketContext from './socketContext';
import './App.css';
import { ChessBoard } from './components/ChessBoard';
import { onConnect } from './handlers/connection-handlers';

const App: React.FC = () => {

    const socket = React.useContext(SocketContext);

    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(onConnect.call(socket));
        });

        return () => {
            socket.off('connect');
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <div id='app'>

                <ChessBoard isConnected={ isConnected } />

            </div>
        </SocketContext.Provider>
    );
}

export default App;