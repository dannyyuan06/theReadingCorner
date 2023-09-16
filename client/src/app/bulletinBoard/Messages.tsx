"use client";
import { useEffect, useState } from "react";
import { WithoutBookMessage } from "./WithoutBookMessage";
import {
  Book,
  BulletinBoardBooks,
  BulletinBoardMessages,
} from "@prisma/client";
import { getMessagesType } from "@/models/BulletinBoard";
import Pusher from "pusher-js";

// let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

interface booksType extends BulletinBoardBooks {
  book: Book;
}

export interface messagePropType extends BulletinBoardMessages {
  books: booksType[];
}
// Access Pusher API
// This is exposed to the client but that is fine because they can only read
// and not write
const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_CLIENT_ID!, {
  cluster: "eu",
});
export function Messages({
  messagesProp,
}: {
  messagesProp: getMessagesType[];
}) {
  const [messages, setMessages] = useState(messagesProp);
  useEffect(() => {
    const channel = pusher.subscribe("messages");
    channel.bind("message", (message: getMessagesType) => {
      setMessages((prev) => [message, ...prev]);
    });

    return () => {
      pusher.unsubscribe("messages");
    };
    // Just here if needed in the future.
    // if (!socket) {
    //     socket = io(process.env.NEXT_PUBLIC_BULLETINBOARD_HOST!);

    //     socket.on("connect", () => {
    //       console.log("connected");
    //     });
    //     socket.on("message", (message:getMessagesType) => {
    //       console.log("hello", message);
    //       setMessages(prev => [message, ...prev])
    //     });
    //   }
    // return () => {
    //     if (socket) {
    //         socket.disconnect();
    //         socket = null;
    //     }
    // };
  }, []);
  return (
    <>
      {messages.map((message: getMessagesType) => (
        <WithoutBookMessage key={message.messageid} message={message} />
      ))}
    </>
  );
}
