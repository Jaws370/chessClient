import React from 'react';
import SocketContext from './socketContext';
import './App.css';

const App: React.FC = () => {

    const socket = React.useContext(SocketContext);

    return (
        <SocketContext.Provider value={socket}>
            <h1>Hello World</h1>
        </SocketContext.Provider>
    );
}

export default App;