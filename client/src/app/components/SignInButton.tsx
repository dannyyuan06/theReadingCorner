'use client'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function SignInButton({className}: {className: string}) {

    const {data}:any = useSession()
    const router = useRouter()

    const clickHandler = () => {
        if (data && data.accessLevel > 0) router.push("/dashboard")
        else signIn()
    }
    return (
        <button className={className} onClick={clickHandler}>Sign In</button>
    )
}