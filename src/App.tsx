import React, { useState, useEffect } from 'react';
import SocketContext from './socketContext';
import './App.css';
import { ChessBoard } from './components/ChessBoard';
import { onConnect, onDisconnect } from './handlers/connection-handlers';
import { ServerStatus } from './types/serverStatus';
import { unpack } from './packaging/unpacking';

const App: React.FC = () => {

    const socket = React.useContext(SocketContext);

    const serverStatusDefault: ServerStatus = {
        clientToMove: 0,
        wasGoodMove: false,
        previousMoves: [],
        board: 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
    }

    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [serverStatus, setServerStatus] = useState<ServerStatus>(serverStatusDefault);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(onConnect.call(socket));
        });

        socket.on('status:update', (rawServerStatus: string) => {
            setServerStatus(unpack(rawServerStatus));
        });

        socket.on('disconnect', () => {
            setIsConnected(onDisconnect.call(socket));
        });

        return () => {
            socket.off('connect');
            socket.off('status:update');
            socket.off('disconnect');
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <div id='app'>

                <ChessBoard isConnected={ isConnected } serverStatus={ serverStatus } />

            </div>
        </SocketContext.Provider>
    );
}

export default App;