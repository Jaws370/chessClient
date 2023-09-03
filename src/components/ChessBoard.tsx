import React, { useState, useEffect, useContext } from 'react';

import { Socket } from 'socket.io-client';

import SocketContext from '../socketContext';

import './ChessBoard.css';

import { ChessPiece } from './ChessPiece';
import { ChessBoardProps } from '../types/ChessBoardProps';
import { ClientStatus } from '../types/clientStatus';

import { pack } from '../packaging/packing';

export const ChessBoard: React.FC<ChessBoardProps> = ({ serverStatus, isConnected }) => {

    const socket: Socket = useContext(SocketContext);

    const SPACES = 64;

    const ALPHABET_INDEX = ["a", "b", "c", "d", "e", "f", "g", "h"];

    var chessBoard = [];

    const [board, setBoard] = useState<string>('rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR');

    const [moveCouple, setMoveCouple] = useState<string[]>([]);

    const [previousMoves, setPreviousMoves] = useState<string[]>([]);

    useEffect(() => {
        if (serverStatus) {
            setBoard(serverStatus.board);
            setPreviousMoves(serverStatus.previousMoves);
        }
    }, [serverStatus]);

    useEffect(() => {

        if (moveCouple.length === 2) {

            const clientStatus: ClientStatus = {
                clientNumber: 1,
                isWhite: true,
                move: {
                    old: moveCouple[0],
                    new: moveCouple[1]
                },
                board: board,
                previousMoves: previousMoves
            }

            console.log('sending move...');
            
            socket.emit('game:move', pack(clientStatus));

            setMoveCouple([]);

        }

    }, [moveCouple, board])

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        if ((event.currentTarget.getAttribute('data-piece') !== ' ' ||
            moveCouple.length === 1) && moveCouple[0] !== event.currentTarget.id) {

            setMoveCouple([...moveCouple, event.currentTarget.id]);

        }

    }

    for (let i = 0; i < SPACES; i++) {

        const IS_WHITE = !((i + Math.floor(i / 8)) % 2) ? 'white' : 'black';

        const ROW = 8 - Math.floor(i / 8);

        const COLLUMN = ALPHABET_INDEX[i % 8];

        const IS_HIGHLIGHTED = moveCouple[0] === (COLLUMN + ROW);

        chessBoard.push(

            <div className='square'
                key={COLLUMN + ROW}
                id={COLLUMN + ROW}
                onClick={handleClick}
                data-highlighted={IS_HIGHLIGHTED}
                data-color={IS_WHITE}
                data-piece={board[i]}>

                <ChessPiece id={COLLUMN + ROW} type={board[i]} isWhite={IS_WHITE} />

            </div>

        );

    }

    return (
        <div className='chessBoard'>
            {chessBoard}
        </div>
    );

}