'use client'
import { signIn } from "next-auth/react"

export function SignInButton({className}: {className: string}) {
    return (
        <button className={className} onClick={() => signIn()}>Sign In</button>
    )
}