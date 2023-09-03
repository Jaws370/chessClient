import React from 'react';
import SocketContext from './socketContext';
import './App.css';

import { ChessBoard } from './components/ChessBoard';

const App: React.FC = () => {

    const socket = React.useContext(SocketContext);

    return (
        <SocketContext.Provider value={socket}>
            <div id='app'>

                <ChessBoard />

            </div>
        </SocketContext.Provider>
    );
}

export default App;