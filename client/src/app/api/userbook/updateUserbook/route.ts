import { UpdateUserbookType } from "@/lib/types/fetchTypes/updateUserbook";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";

export async function POST(req: NextRequest) {
    const body:UpdateUserbookType = await req.json()

    const [access, res] = await apiMiddleware(req, 0, body.username)
    if (!access) return res

    const [userbookReturn, error] = await User.updateReadBook(body)
    return NextResponse.json(userbookReturn)
}