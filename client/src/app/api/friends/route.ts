import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { apiMiddleware } from "../middleware";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const [access, res] = await apiMiddleware(req, 0, body.username)
    if (!access) return res

    const [friendship, err] = await User.friendRequest(body.username, body.friendUsername)
    if (!friendship) return NextResponse.json({err}, {status: 400})
    return NextResponse.json({friendship})
}

export async function PATCH(req: NextRequest) {
    const body = await req.json()
    const [access, res] = await apiMiddleware(req, 0, body.username)
    if (!access) return res

    const [friendship, err] = await User.acceptFriendRequest(body.friendid, body.username)
    if (!friendship) return NextResponse.json({err}, {status: 400})
    return NextResponse.json({friendship})
}