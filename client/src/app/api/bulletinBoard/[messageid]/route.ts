import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";
import { BulletinBoard } from "@/models/BulletinBoard";
import { getToken } from "next-auth/jwt";

export async function DELETE(req: NextRequest, {params}: {params: {messageid: string}}) {
    const [access, res] = await apiMiddleware(req, 0)
    if (!access) return res

    const token:any = await getToken({req})

    const [message, err] = await BulletinBoard.deleteMessage(parseInt(params.messageid), token.username, token.accessLevel)
    if (!message) return NextResponse.json({err}, {status: 400})
    return NextResponse.json({message})
}

export async function PATCH(req: NextRequest, {params}: {params: {messageid: string}}) {
    const [access, res] = await apiMiddleware(req, 0)
    if (!access) return res

    const [message, err] = await BulletinBoard.reportMessage(parseInt(params.messageid))
    if (!message) return NextResponse.json({err}, {status: 400})
    return NextResponse.json({message})
}