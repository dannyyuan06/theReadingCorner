import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../../middleware";
import User from "@/models/User";

export async function GET(req: NextRequest, {params}: {params: {username: string}}) {
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res
    if (params.username.length < 8) return NextResponse.json({users: []})
    const [users, err] = await User.getMembers(params.username)
    if (!users) return NextResponse.json({err}, {status: 400})
    return NextResponse.json(users)
}