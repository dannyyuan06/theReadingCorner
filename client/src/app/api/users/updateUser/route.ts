import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { apiMiddleware } from "../../middleware";
import { nameValidation } from "@/lib/validation/name";
import { emailValidation } from "@/lib/validation/Email";

export async function PATCH(req: NextRequest) {
    const body = await req.json()
    const [access, res] = await apiMiddleware(req, 0, body.username)
    if (!access) return res

    const {username, firstname, lastname, email, description} = body

    let errors:string[] = []
    const [isFCorrect, errFStr] = nameValidation(firstname)
    if (!isFCorrect) errors.push(errFStr)
    const [isLCorrect, errLStr] = nameValidation(lastname)
    if (!isLCorrect) errors.push(errLStr)
    const [isECorrect, errEStr] = emailValidation(email)
    if (!isECorrect) errors.push(errEStr)

    if (errors.length !== 0) return NextResponse.json(errors, {status: 400})

    const [user, err] = await User.updateProfile(username, firstname, lastname, email, description)
    if (!user) return NextResponse.json({err}, {status: 400})
    return NextResponse.json({user})
}