import { GetUserbookType } from "@/lib/types/fetchTypes/getUserbook"
import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server"
import { apiMiddleware } from "../../middleware"


export async function POST(req: NextRequest) {
    const body: GetUserbookType = await req.json()
    
    const [access, res] = await apiMiddleware(req, 0, body.username)
    if (!access) return res
    
    const [userbook, err] = await User.hasReadBook(body.username, body.bookid)
    if (err !== "") return NextResponse.json({})
    return NextResponse.json(userbook)
}