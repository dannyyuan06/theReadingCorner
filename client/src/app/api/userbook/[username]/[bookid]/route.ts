import User from "@/models/User"
import { NextRequest, NextResponse } from "next/server"
import { apiMiddleware } from "../../../middleware"
import { UpdateUserbookBookType } from "@/lib/types/fetchTypes/addUserbook"

export async function PUT(req: NextRequest, {params}: {params: {username: string, bookid: string}}) {
    const body:UpdateUserbookBookType = await req.json()

    const [access, res] = await apiMiddleware(req, 0, params.username)
    if (!access) return res

    if (body.score === -1 && body.status === 0) {
        return NextResponse.json({error: "Cannot update userbook."}, {status: 400})
    }

    const [userbookReturn, error] = await User.updateReadBook(params.username, params.bookid, body)
    if (!userbookReturn) return NextResponse.json({error}, {status: 400})
    return NextResponse.json(userbookReturn)
}


export async function DELETE(req: NextRequest, {params} : {params: {username: string, bookid: string}}) {
    const [access, res] = await apiMiddleware(req, 0, params.username)
    if (!access) return res

    const [userbookReturn, error] = await User.deleteUserBook(params.username, params.bookid)
    if (!userbookReturn) return NextResponse.json({error}, {status: 400})
    return NextResponse.json(userbookReturn)
}