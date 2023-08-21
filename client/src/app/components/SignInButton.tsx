'use client'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loading from "../loading/Loading"

export function SignInButton({className}: {className: string}) {

    const {data}:any = useSession()
    const router = useRouter()
    const [clicked, setClicked] = useState(false)

    const clickHandler = () => {
        if (data && data.accessLevel > 0) {
            router.push("/dashboard");
            setClicked(true)
        }
        else signIn()
    }
    return (
        <>
            <button className={className} onClick={clickHandler}>Sign In</button>
            {
                clicked && <Loading />
            }
        </>

    )
}