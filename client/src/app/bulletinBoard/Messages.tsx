'use client'
import { useEffect, useState } from "react";
import { WithoutBookMessage } from "./WithoutBookMessage"
import { io, type Socket } from "socket.io-client";
import type {
    ServerToClientEvents,
    ClientToServerEvents,
  } from './socketTypes'
import { Book, BulletinBoardBooks, BulletinBoardMessages, BulletinBoardMessagesPayload, Users } from "@prisma/client";
import { getMessagesType } from "@/models/BulletinBoard";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

interface booksType extends BulletinBoardBooks {
    book: Book
}

export interface messagePropType extends BulletinBoardMessages {
    books: booksType[]
}

export function Messages({messagesProp}: {messagesProp: getMessagesType[]}) {

    const [messages, setMessages] = useState(messagesProp)
    console.log(messages)
    useEffect(() => {
        if (!socket) {
            socket = io(process.env.NEXT_PUBLIC_BULLETINBOARD_HOST!);
            
            socket.on("connect", () => {
              console.log("connected");
            });
            socket.on("message", (message:getMessagesType) => {
              console.log("hello", message);
              setMessages(prev => [message, ...prev])
            });
          }
        return () => {
            if (socket) {
                socket.disconnect();
                socket = null;
            }
        };
    }, [])
    return (
        <>
            {messages.map((message: getMessagesType) => (
                <WithoutBookMessage key={message.messageid} message={message}/>
            ))}
        </>
    )
}
