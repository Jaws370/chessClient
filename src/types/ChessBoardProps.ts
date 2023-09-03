import { ServerStatus } from "./serverStatus"

export type ChessBoardProps = {
    isConnected: boolean,
    serverStatus: ServerStatus | undefined
}