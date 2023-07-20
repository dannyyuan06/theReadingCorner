import User, { clientUserType } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json()
    const res = await User.addUserInDatabse(body)
    return NextResponse.json({res: res})
}