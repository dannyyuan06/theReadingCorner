"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../loading/Loading";

export default function RegisterButton({className, signedIn}: {className: string, signedIn: boolean}) {
    // const {data}: any = useSession()
    const router = useRouter()
    const [clicked, setClicked] = useState(false)

    const clickHandler = () => {
        setClicked(true)
        if (signedIn) {
            router.push("/dashboard")
        }
        else {
            router.push("/register/credentials")
        }
    }

    return (
        <>
            <button className={className} onClick={clickHandler}>REGISTER</button>
            {
                clicked && <Loading />
            }
        </>
    )
}