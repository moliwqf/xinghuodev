import {io} from "socket.io-client";


let socket: any = null;


export function socketInstance() {
    socket = io('http://localhost:3000', {
        transports: ['websocket'],
        autoConnect: true
    });
    return socket;
}

export function getSocket() {
    return socket;
}