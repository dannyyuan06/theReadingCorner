import { GetUserbookType } from "@/lib/types/fetchTypes/getUserbook"
import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server"
import { apiMiddleware } from "../../../middleware"
import { UpdateUserbookBookType } from "@/lib/types/fetchTypes/addUserbook"

export async function PUT(req: NextRequest, {params}: {params: {username: string, bookid: string}}) {
    const body:UpdateUserbookBookType = await req.json()

    const [access, res] = await apiMiddleware(req, 0, params.username)
    if (!access) return res

    const [userbookReturn, error] = await User.updateReadBook(params.username, params.bookid, body)
    if (!userbookReturn) return NextResponse.json({error}, {status: 500})
    return NextResponse.json(userbookReturn)
}