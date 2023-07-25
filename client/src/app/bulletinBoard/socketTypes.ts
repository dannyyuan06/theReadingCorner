import { getMessagesType } from "@/models/BulletinBoard";

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    message: (a: getMessagesType) => void;
    connected: (a: {[id: string]: any}) => void;
}

export interface ClientToServerEvents {
    message: (a: {[id: string]: any}) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}