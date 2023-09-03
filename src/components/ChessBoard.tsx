import React, { useState, useEffect } from 'react';

import './ChessBoard.css';

import { ChessPiece } from './ChessPiece';

export const ChessBoard: React.FC = () => {

    const SPACES = 64;

    const ALPHABET_INDEX = ["a", "b", "c", "d", "e", "f", "g", "h"];

    var chessBoard = [];

    const [board, setBoard] = useState('rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR');

    const [moveCouple, setMoveCouple] = useState<string[]>([]);

    const [previousMoves, setPreviousMoves] = useState([]);

    useEffect(() => {

        /*if (moveCouple.length === 2) {

            const [isGoodMove, newBoard, newPreviousMoves] = checkMove(moveCouple[0], moveCouple[1], rawBoard, previousMoves);

            if (isGoodMove) {

                setBoard(newBoard);
                setPreviousMoves(newPreviousMoves);

            }

            setMoveCouple([]);

        }*/

    }, [moveCouple, board, previousMoves])

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

                <ChessPiece id={COLLUMN + ROW} type={board[i]} />

            </div>

        );

    }

    return (
        <div className='chessBoard'>
            {chessBoard}
        </div>
    );

}