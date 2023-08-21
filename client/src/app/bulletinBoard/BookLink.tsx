'use client'
import Link from "next/link"
import styles from './BookLink.module.css'
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { changePage } from "@/redux/features/pageSlice"
import Image from "next/image"

export function BookLink({link, image}: {link: string, image: string}) {
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Link className={styles.container} href={link} onClick={() => dispatch(changePage(""))}>
            <Image style={{objectFit: 'cover', flex: 1}} src={image} height={80} width={60} alt='book image'/>
        </Link>
    )
}