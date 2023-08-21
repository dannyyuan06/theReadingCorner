import { apiMiddleware } from "@/app/api/middleware";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params}: {params: {username: string}}) {
    const body = await req.json();
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res

    const [user, err] = await User.resetPassword(params.username, body.password)
    if (!user) NextResponse.json({err}, {status: 400})
    return NextResponse.json({user})
}