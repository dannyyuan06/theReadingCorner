import Book from "@/models/Book";
import { BulletinBoard } from "@/models/BulletinBoard";
import { NextRequest, NextResponse } from "next/server";
import Pusher from 'pusher'

export async function POST(req: NextRequest) {
    const body = await req.json()

    const message = body.message

    const pusher = new Pusher({
        appId: "1642447",
        key: process.env.NEXT_PUBLIC_PUSHER_CLIENT_ID!,
        secret: process.env.PUSHER_CLIENT_SECRET!,
        cluster: "eu",
        useTLS: true,
    })
    const res = await BulletinBoard.addMessage(message)

    await pusher.trigger("messages", "message", {
        ...message,
        user: body.user,
        books: body.books,
        dateCreated: body.dateCreated,
        messageid: res.messageid,
    })

    return NextResponse.json(res)
}