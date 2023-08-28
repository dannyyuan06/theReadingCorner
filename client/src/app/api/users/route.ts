import { userModelType } from "@/app/register/credentials/Form";
import confirmPasswordValidation from "@/lib/validation/ConfirmPassword";
import { emailValidation } from "@/lib/validation/Email";
import { passwordValidation } from "@/lib/validation/Password";
import { usernameFastValidation } from "@/lib/validation/UsernameFast";
import { nameValidation } from "@/lib/validation/name";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {formData, type}:{formData:userModelType, type: string} = await req.json()

    const {username, email, firstName, lastName, description, password, confirmPassword} = formData;

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
    const isDescriptionValid = typeof description === "string"
    if (!isDescriptionValid) return errorResult("description")
    const [isPasswordValid,] = passwordValidation(password)
    if (!isPasswordValid && type === "credentials") return errorResult("password")
    const [isConfirmPasswordValid,] = confirmPasswordValidation(password, confirmPassword)
    if (!isConfirmPasswordValid && type === "credentials") return errorResult("password")
    
    const res = await User.addUserInDatabse(formData)
    return NextResponse.json({res: res})
}