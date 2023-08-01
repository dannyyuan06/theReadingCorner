import { BulletinBoard } from "@/models/BulletinBoard";
import { NextRequest, NextResponse } from "next/server";
import Pusher from 'pusher'
import { apiMiddleware } from "../../middleware";
import { AddMessageType } from "@/lib/types/fetchTypes/addMessage";

export async function POST(req: NextRequest) {
    const body:AddMessageType = await req.json()

    const [access, errRes] = await apiMiddleware(req, 0)
    if (!access) return errRes
    
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
        books: body.message.books,
        dateCreated: body.dateCreated,
        messageid: res.messageid,
    })

    return NextResponse.json(res)
}