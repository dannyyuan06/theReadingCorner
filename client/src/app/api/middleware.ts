import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function apiMiddleware(req: NextRequest, accessLevel: number, username?: string): Promise<[boolean, NextResponse|null]> {
    const token:any = await getToken({req})
    if (token.accessLevel >= accessLevel) return [true, null]
    if (username && username === token.username) return [true, null]
    return [false, NextResponse.json({error: "Unauthorised"}, {status: 401})]
}