import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    const body = await req.json()
    const [userbook, err] = await User.hasReadBook(body.username, body.bookid)
    if (err !== "") return NextResponse.json({})
    return NextResponse.json(userbook)
}