import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";
import User from "@/models/User";

export async function GET(req: NextRequest) {
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res
    const [users, err] = await User.getMembers(null)
    if (!users) return NextResponse.json({err}, {status: 400})
    return NextResponse.json(users)
}