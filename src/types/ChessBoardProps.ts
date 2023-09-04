import { ServerStatus } from './ServerStatus';

export type ChessBoardProps = {
    isConnected: boolean,
    isWhite: boolean, 
    clientNumber: number,
    serverStatus: ServerStatus | undefined
}