import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";
import User, { UpdateUser } from "@/models/User";
import { nameValidation } from "@/lib/validation/name";
import { emailValidation } from "@/lib/validation/Email";

export async function DELETE(req: NextRequest, {params}: {params: {username: string}}) {
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res

    const [user, err] = await User.deleteAccount(params.username)
    if (!user) NextResponse.json({err}, {status: 400})
    return NextResponse.json({user})
}

export async function PATCH(req: NextRequest, {params}: {params: {username: string}}) {
    
    const body:UpdateUser = await req.json()
    const key = Object.keys(body)[0]

    const keyChecks:{[id: string]: number}= {
        "accessLevel": 3
    }

    const [access, res] = await apiMiddleware(req, keyChecks[key])
    if (!access) return res

    const [user, err] = await User.update(params.username, body)
    if (!user) NextResponse.json({err}, {status: 400})
    return NextResponse.json({user})
}

export async function GET(_: NextRequest, {params}: {params: {username: string}}) {
    const res = await User.usernameMake(params.username)
    return NextResponse.json({res: res})
}

export async function PUT(req: NextRequest, {params}: {params: {username: string}}) {
    const body = await req.json()
    const [access, res] = await apiMiddleware(req, 0, params.username)
    if (!access) return res

    const {firstname, lastname, email, description} = body

    let errors:string[] = []
    const [isFCorrect, errFStr] = nameValidation(firstname)
    if (!isFCorrect) errors.push(errFStr)
    const [isLCorrect, errLStr] = nameValidation(lastname)
    if (!isLCorrect) errors.push(errLStr)
    const [isECorrect, errEStr] = emailValidation(email)
    if (!isECorrect) errors.push(errEStr)

    if (errors.length !== 0) return NextResponse.json(errors, {status: 400})

    const [user, err] = await User.updateProfile(params.username, firstname, lastname, email, description)
    if (!user) return NextResponse.json({err}, {status: 400})
    return NextResponse.json({user})
}