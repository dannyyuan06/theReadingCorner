import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../../middleware";
import { BulletinBoard } from "@/models/BulletinBoard";

export async function DELETE(req: NextRequest, {params}: {params: {messageid: string}}) {
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res

    const [message, err] = await BulletinBoard.deleteMessage(parseInt(params.messageid))
    if (!message) NextResponse.json({err}, {status: 400})
    return NextResponse.json({message})
}