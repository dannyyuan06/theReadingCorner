import Book from "@/models/Book";
import { BulletinBoard } from "@/models/BulletinBoard";
import { NextRequest, NextResponse } from "next/server";
import Pusher from 'pusher'

export async function GET(req: NextRequest) {
    const res = await BulletinBoard.getMessages(10)
    return NextResponse.json(res)
}