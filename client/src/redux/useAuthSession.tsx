import { useSession } from "next-auth/react";
import { Users } from "@prisma/client";


export default function useAuthSession() {

    const {data}:any = useSession()
    const user = data as Users|null
    return user
}