import { NextRequest, NextResponse } from "next/server"
import User from "@/models/User"

type ReqBody = {
    username: string,
    password: string
}

export async function POST(request: NextRequest) {
    const body: ReqBody = await request.json()
    const [isCorrect, user] = await User.validatePassword(body.username, body.password)
    
    if (isCorrect) {
        return NextResponse.json({...user})
    }
    return NextResponse.json({status: 404})
}