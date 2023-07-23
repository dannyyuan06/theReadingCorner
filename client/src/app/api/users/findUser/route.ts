import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json()
    const res = await User.usernameMake(body.username)
    return NextResponse.json({res: res})
}