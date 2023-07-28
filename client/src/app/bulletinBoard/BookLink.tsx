'use client'

import Link from "next/link"
import { allBooks } from "./books"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { changePage } from "@/redux/features/pageSlice"
import Image from "next/image"
import { Book } from "@prisma/client"
import { BookType } from "../bookexample"

export function BookLink({link, image}: {link: string, image: string}) {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Link href={link} onClick={() => dispatch(changePage(""))}>
            <Image style={{objectFit: 'contain', flex: 1}} src={image} height={80} width={60} alt='book image'/>
        </Link>
    )
}