'use client'
import { changePage } from "@/redux/features/pageSlice"
import { AppDispatch } from "@/redux/store"
import Link from "next/link"
import { ReactNode } from "react"
import { useDispatch } from "react-redux"
import styles from './DispatchLink.module.css'

export function DispatchLink({ link, children} : {link: string, children: ReactNode}) {

    const dispatch = useDispatch<AppDispatch>()

    return (
        <Link className={styles.container} style={{backgroundColor: 'transparent'}} href={link} onClick={() => dispatch(changePage(""))}>
            {children}
        </Link>
    )
}