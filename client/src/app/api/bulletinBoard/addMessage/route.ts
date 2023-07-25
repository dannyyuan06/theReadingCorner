import Book from "@/models/Book";
import { BulletinBoard } from "@/models/BulletinBoard";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const message = body.message

    const res = await BulletinBoard.addMessage(message)
    return NextResponse.json(res)
}