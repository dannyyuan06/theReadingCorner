import { signJwtAccessToken } from "@/lib/jwt";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    const token = await getToken({req})
    if (!token) return NextResponse.json({status: 400, body: "Incorrect Input"})
    const accessToken = signJwtAccessToken(token!)
    return NextResponse.json({token: accessToken})
}