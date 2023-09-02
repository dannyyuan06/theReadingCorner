'use client'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Loading from "../loading/Loading"

export function SignInButton({className, signedIn}: {className: string, signedIn: boolean}) {

    // const {data}:any = useSession()
    const router = useRouter()
    const [clicked, setClicked] = useState(false)

    const clickHandler = () => {
        if (signedIn) {
            router.push("/dashboard");
            setClicked(true)
        }
        else signIn()
    }
    return (
        <>
            <button className={className} onClick={clickHandler}>SIGN IN</button>
            {
                clicked && <Loading />
            }
        </>

    )
}