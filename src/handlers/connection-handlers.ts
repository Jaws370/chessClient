import { Socket } from "socket.io-client";

export const onConnect = function (this: Socket): boolean {
    console.log('connected to server');
    this.emit('room:join', '2002');
    return true;
}

export const onDisconnect = function (this: Socket): boolean {
    console.log('disconnected from server');
    return false;
}