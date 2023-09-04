import React, { useState, useEffect } from 'react';

import { ChessBoard } from './components/ChessBoard';

import SocketContext from './socketContext';
import { onConnect, onDisconnect } from './handlers/connection-handlers';
import { ServerStatus } from './types/ServerStatus';
import { unpackSS, unpackSP } from './packaging/unpacking';

import './App.css';
import { StarterPackage } from './types/StarterPackage';

const App: React.FC = () => {

    const socket = React.useContext(SocketContext);

    const serverStatusDefault: ServerStatus = {
        clientToMove: 0,
        wasGoodMove: false,
        previousMoves: [],
        board: 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR'
    }

    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [isWhite, setIsWhite] = useState<boolean>(false);
    const [clientNumber, setClientNumber] = useState<number>(0);
    const [serverStatus, setServerStatus] = useState<ServerStatus>(serverStatusDefault);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(onConnect.call(socket));
        });

        socket.on('status:start', (rawStarterPackage: string) => {
            const starterPackage: StarterPackage = unpackSP(rawStarterPackage);

            setIsWhite(starterPackage.isWhite);
            setClientNumber(starterPackage.clientNumber);
            setServerStatus(starterPackage.serverStatus);
        });

        socket.on('status:update', (rawServerStatus: string) => {
            setServerStatus(unpackSS(rawServerStatus));
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

                <ChessBoard isConnected={ isConnected } isWhite={ isWhite } clientNumber={ clientNumber } serverStatus={ serverStatus } />

            </div>
        </SocketContext.Provider>
    );
}

export default App;