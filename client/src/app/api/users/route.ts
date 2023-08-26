import { emailValidation } from "@/lib/validation/Email";
import { passwordValidation } from "@/lib/validation/Password";
import { usernameFastValidation } from "@/lib/validation/UsernameFast";
import { nameValidation } from "@/lib/validation/name";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const username = body.username;
    const email = body.email;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const accessLevel = body.accessLevel;
    const description = body.description;
    const password = body.password;
    const profilePicture = body.profilePicture;
    const type = body.type

    const errorResult = (str: string) => NextResponse.json({
        body: "Error in sending data " + str,
        status: 404
    })

    const [isUsernameValid,] = await usernameFastValidation(username)
    if (!isUsernameValid) return errorResult("username")
    const [isEmailValid,] = emailValidation(email)
    if (!isEmailValid) return errorResult("email")
    const [isFirstNameValid,] = nameValidation(firstName)
    if (!isFirstNameValid) return errorResult("first name")
    const [isLastNameValid,] = nameValidation(lastName)
    if (!isLastNameValid) return errorResult("last name")
    const isAccessLevelValid = !isNaN(parseInt(accessLevel))
    if (!isAccessLevelValid) return errorResult("access level")
    const isDescriptionValid = typeof description === "string"
    if (!isDescriptionValid) return errorResult("description")
    const [isPasswordValid,] = passwordValidation(password)
    if (!isPasswordValid && type === "credentials") return errorResult("password")
    const isProfilePictureValid = typeof profilePicture === "string"
    if (!isProfilePictureValid) return errorResult("profile picture")
    

    const res = await User.addUserInDatabse(body)
    return NextResponse.json({res: res})
}