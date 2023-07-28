'use client'
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import styles from './SetStatus.module.css'
import { DropDownButton } from '@/app/components/DropDownButton'
import { Book, CurrentlyReading } from '@prisma/client'
import { PageHeader } from '../components/PageHeader'
import { currentBookType } from './SetStatusButton'

type pageType = ""|number

export const statusObj:{[id: string]: number} = {
    "Haven't Read" : 0,
    "Reading": 1,
    "Finished": 2,
    "On Hold": 3,
    "Dropped": 4
}
export const statusArray = Object.keys(statusObj)

export function SetStatus({currentlyReading, book, setClicked, setCurrent}: {currentlyReading: CurrentlyReading,book: Book, setClicked: Dispatch<SetStateAction<boolean>>, setCurrent: Dispatch<SetStateAction<currentBookType>>}) {
    console.log(currentlyReading)
    const pageCount = book.pageCount

    const [status, setStatus] = useState<string>(statusArray[currentlyReading.status])
    const [page, setPage] = useState<pageType>(currentlyReading.pageNumber)
    const changed = useRef(false)

    const setStates = useCallback(( status: number, page:pageType) => {
        setStatus(statusArray[status])
        setPage(page)
        changed.current = true
    }, [])

    const updateStatus = (status: string) => {
        if (statusArray[0] === status) setStates( 0, "")
        else if (statusArray[1] === status) setStates( 1, page !== "" ? page : 1)
        else if (statusArray[2] === status) setStates( 2, pageCount)
        else if (statusArray[3] === status) setStatus(status)
        else if (statusArray[4] === status) setStatus(status)
        else setStates( 0, "")
    }

    const updatePageCount = (page: pageType) => {
        if (page === pageCount) setStates( 2, pageCount)
        else if (page === "") setStates( 0, "")
        else if (page <= pageCount) setStates( 1, page)
    }

    const pageHandler = (e: FormEvent<HTMLInputElement>) => {
        const number = parseInt(e.currentTarget.value)
        if (number <= pageCount) updatePageCount(number)
        else if (Number.isNaN(number)) updatePageCount("")
    }

    const submitHandler = async () => {
        const request:{[id: string]: number|string} = {
            readid: currentlyReading.readid,
            pageNumber: page,
            status: statusObj[status],
        }
        if (changed.current) {
            const res = await fetch("/api/currentlyReading/updateBook", {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { "Content-Type": "application/json" }
            }) 
            const body = await res.json()
            setCurrent(body.res[0])
        }
        setClicked(false)
    }

    return (
        <div className={styles.fullContainer}>
            <div className={styles.container}>
                <PageHeader>EDIT STATUS</PageHeader>
                <div className={styles.scores}>
                    <div className={styles.score}>
                        <h2 className={styles.scoreTitle}>STATUS</h2>
                        <DropDownButton buttons={statusArray} state={status} setState={updateStatus}/>
                    </div>
                    <hr/>
                    <div className={styles.score}>
                        <h2 className={styles.scoreTitle}>PAGE</h2>
                        <h1 className={styles.scoreRating}>
                            <input type='number' onInput={pageHandler} value={page} className={styles.pageNumber + " " + styles.inputType} max={pageCount} min={0} step={1}/>
                            <span className={styles.totalPages}>/{pageCount}</span></h1>
                    </div>
                </div>
                <div className={styles.submitButtonWrapper}>
                    <button className={styles.cancelButton} onClick={() => setClicked(false)}>
                        CANCEL
                    </button>
                    <button className={styles.submitButton} style={changed.current ? {backgroundColor: "var(--theme-green)"}: {}} onClick={submitHandler}>
                        SUMBIT
                    </button>
                </div>
            </div>
        </div>
    )
}