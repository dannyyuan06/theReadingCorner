'use client'

import Link from "next/link"
import { allBooks } from "./books"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { changePage } from "@/redux/features/pageSlice"
import Image from "next/image"

export function BookLink({link, book}: {link: string, book: string}) {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Link href={link} onClick={() => dispatch(changePage(""))}>
            <Image style={{objectFit: 'contain', flex: 1}} src={allBooks[book].volumeInfo.imageLinks.small} height={80} width={60} alt='book image'/>
        </Link>
    )
}