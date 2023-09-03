import { Socket } from "socket.io-client";

export const onConnect = function (this: Socket): boolean {
    console.log('connected to server');
    return true;
}