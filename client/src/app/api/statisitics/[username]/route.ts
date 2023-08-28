import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";
import User from "@/models/User";

export async function PATCH(req: NextRequest, {params}: {params: {username: string}}) {

    const [access, errRes] = await apiMiddleware(req, 0, params.username)
    if (!access) return errRes

    const [success, err] = await User.hasLookedAtBulletinBoard(params.username)

    if (!success) return NextResponse.json({err}, {status: 500})
    return NextResponse.json(success)
}