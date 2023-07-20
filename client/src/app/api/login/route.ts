import { NextRequest, NextResponse } from "next/server"
import * as bcrypt from 'bcrypt'
import { prisma } from "@/prisma/db"
import { signJwtAccessToken } from "@/lib/jwt"

type ReqBody = {
    username: string,
    password: string
}

export async function POST(request: NextRequest) {
    const body: ReqBody = await request.json()


    const user = await prisma.users.findFirst({
        where: {
            username: body.username
        }
    })

    if (user && await bcrypt.compare(body.password, user.password)) {
        const {password, ...userWithoutPass} = user
        const accessToken = signJwtAccessToken(userWithoutPass)
        const result = {
            ...userWithoutPass,
            accessToken
        }
        return NextResponse.json(result)
    }
    else return NextResponse.json(null)
}