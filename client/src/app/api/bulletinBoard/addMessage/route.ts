import Book from "@/models/Book";
import { BulletinBoard } from "@/models/BulletinBoard";
import { NextRequest, NextResponse } from "next/server";
import Pusher from 'pusher'

export async function POST(req: NextRequest) {
    const body = await req.json()

    const message = body.message

    const pusher = new Pusher({
        appId: "1642447",
        key: "31fa0b3eb21d6f9b7849",
        secret: "b18a656e3fce9845c4dc",
        cluster: "eu",
        useTLS: true,
    })
    const res = await BulletinBoard.addMessage(message)

    pusher.trigger("messages", "message", {
        ...message,
        user: body.user,
        books: body.books,
        dateCreated: body.dateCreated,
        messageid: res.messageid,
    })

    return NextResponse.json(res)
}