import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function apiMiddleware(
  req: NextRequest,
  accessLevel: number,
  username?: string
): Promise<[boolean, NextResponse | null]> {
  try {
    // Get the cookie from the request
    const token: any = await getToken({ req });
    // If the token access level is right
    if (token.accessLevel >= accessLevel) return [true, null];
    // If the request relates to a specific user, check if the username matches
    if (username && username === token.username) return [true, null];
    return [
      false,
      NextResponse.json({ error: "Unauthorised" }, { status: 401 }),
    ];
  } catch (err) {
    return [
      false,
      NextResponse.json({ error: "Unauthorised" }, { status: 401 }),
    ];
  }
}
