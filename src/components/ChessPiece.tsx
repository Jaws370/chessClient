import React from 'react';
import { ChessPieceProps } from '../types/ChessPieceProps';

import './ChessPiece.css';

import wPawn from '../assets/images/wPawn.png';
import wBishop from '../assets/images/wBishop.png';
import wRook from '../assets/images/wRook.png';
import wKing from '../assets/images/wKing.png';
import wQueen from '../assets/images/wQueen.png';
import wKnight from '../assets/images/wKnight.png';

import bPawn from '../assets/images/bPawn.png';
import bRook from '../assets/images/bRook.png';
import bKing from '../assets/images/bKing.png';
import bQueen from '../assets/images/bQueen.png';
import bKnight from '../assets/images/bKnight.png';
import bBishop from '../assets/images/bBishop.png';

import blank from '../assets/images/blank.png';

export const ChessPiece: React.FC<ChessPieceProps> = (props) => {

    let source;

    switch (props.type) {
        case 'p':
            source = bPawn;
            break;
        case 'P':
            source = wPawn;
            break;
        case 'b':
            source = bBishop;
            break;
        case 'B':
            source = wBishop;
            break;
        case 'n':
            source = bKnight;
            break;
        case 'N':
            source = wKnight;
            break;
        case 'r':
            source = bRook;
            break;
        case 'R':
            source = wRook;
            break;
        case 'q':
            source = bQueen;
            break;
        case 'Q':
            source = wQueen;
            break;
        case 'k':
            source = bKing;
            break;
        case 'K':
            source = wKing;
            break;
        default:
            source = blank;
    }

    return (
        <img id={props.id} className='piece' src={source} alt='piece' />
    );
}