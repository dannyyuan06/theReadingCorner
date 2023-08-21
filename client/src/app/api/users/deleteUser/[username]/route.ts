import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../../middleware";
import User from "@/models/User";

export async function DELETE(req: NextRequest, {params}: {params: {username: string}}) {
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res

    const [user, err] = await User.deleteAccount(params.username)
    if (!user) NextResponse.json({err}, {status: 400})
    return NextResponse.json({user})
}