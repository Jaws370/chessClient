import React, { useState, useEffect, useContext } from 'react';
import { Socket } from 'socket.io-client';

import SocketContext from '../socketContext';
import { ChessPiece } from './ChessPiece';

import { isLowerCase } from '../service-functions/isLowerCase';
import { pack } from '../packaging/packing';

import { ChessBoardProps } from '../types/ChessBoardProps';
import { ClientStatus } from '../types/clientStatus';

import './ChessBoard.css';

export const ChessBoard: React.FC<ChessBoardProps> = ({ serverStatus, isConnected, isWhite, clientNumber }) => {

    let chessBoard: JSX.Element[] = [];

    const socket: Socket = useContext(SocketContext);

    const [board, setBoard] = useState<string>('rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR');
    const [nextToMove, setNextToMove] = useState<number>(0);
    const [moveCouple, setMoveCouple] = useState<string[]>([]);

    const ALPHABET_INDEX: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

    useEffect(() => {

        if (serverStatus) {

            setBoard(serverStatus.board);
            setNextToMove(serverStatus.clientToMove);

        }

    }, [serverStatus]);

    useEffect(() => {

        if (moveCouple.length === 2) {

            const clientStatus: ClientStatus = {
                clientNumber: clientNumber,
                isWhite: isWhite,
                move: {
                    old: moveCouple[0],
                    new: moveCouple[1]
                },
                board: board,
                previousMoves: serverStatus!.previousMoves
            }

            console.log('sending move...');
            socket.emit('game:move', pack(clientStatus));

            setMoveCouple([]);

        }

    }, [moveCouple, board]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {

        if (clientNumber !== nextToMove) {
            setMoveCouple([]);
            return;
        }

        if (e.currentTarget.getAttribute('data-piece') !== ' ') {

            if (moveCouple.length === 0) {

                if (isLowerCase(e.currentTarget.getAttribute('data-piece')!) === isWhite) {
                    setMoveCouple([]);
                    return;
                }

            } else {

                if (!isLowerCase(e.currentTarget.getAttribute('data-piece')!) === isWhite) {
                    setMoveCouple([]);
                    return;
                }

            }

        } else if (moveCouple.length === 0) {
            setMoveCouple([]);
            return;
        }

        if (moveCouple[0] === e.currentTarget.id) {
            setMoveCouple([]);
            return;
        }

        setMoveCouple([...moveCouple, e.currentTarget.id]);

    }

    for (let i = 0; i < 64; i++) {

        const isWhiteSquare: boolean = isWhite ? !((i + Math.floor(i / 8)) % 2) : !!((i + Math.floor(i / 8)) % 2);

        const difference: number = isWhite ? i * 2 : 63;
        const position: string = ALPHABET_INDEX[(difference - i) % 8] + (8 - Math.floor((difference - i) / 8));

        const isSelected: boolean = moveCouple[0] === position;

        const pBoard = isWhite ? board : board.split('').reverse().join('');

        chessBoard.push(

            <div
                className='square'
                key={position}
                id={position}
                onClick={handleClick}
                data-highlighted={isSelected}
                data-color={isWhiteSquare}
                data-piece={pBoard[i]}
            >

                <ChessPiece id={position} type={pBoard[i]} isWhiteSquare={isWhiteSquare} />

            </div>

        );

    }

    return (

        <div className='chessBoard'>
            {chessBoard}
        </div>

    );

}