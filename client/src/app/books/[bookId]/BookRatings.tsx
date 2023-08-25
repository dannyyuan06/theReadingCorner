'use client'
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './BookRatings.module.css'
import { DropDownButton } from '@/app/components/DropDownButton'
import { BookType } from '@/app/bookexample'
import { useSession } from 'next-auth/react'
import { AddUserbookBookType, AddUserbookType } from '@/lib/types/fetchTypes/addUserbook'
import { GetUserbookType } from '@/lib/types/fetchTypes/getUserbook'
import { UserBook } from '@prisma/client'

type pageType = ""|number

const scoreArray = [
    "10 - Masterpiece",
    "9 - Great",
    "8 - Very Good",
    "7 - Good",
    "6 - Fine",
    "5 - Average",
    "4 - Readable",
    "3 - Bad",
    "2 - Terrible",
    "1 - Appalling"
]

export const statusObj:{[id: string]: number} = {
    "Haven't Read" : 0,
    "Reading": 1,
    "Finished": 2,
    "On Hold": 3,
    "Dropped": 4
}
export const statusArray = Object.keys(statusObj)

let pageTimeout: NodeJS.Timeout

export function BookRatings({book, userbook}: {book: BookType, userbook: UserBook|null}) {

    const pageCount = book.volumeInfo.pageCount

    const [myScore, setMyScore] = useState<string|number>("-")
    const [myScoreWithWords, setMyScoreWithWords] = useState<string>("")
    const [status, setStatus] = useState<string>(statusArray[0])
    const [page, setPage] = useState<pageType>("")
    const isAlreadyBook = useRef(false)
    const [changed, setChanged] = useState(false)

    const { data }:any = useSession()

    const parseScore = (score: string) => {
        const number = parseInt(score)
        const numberScore = Number.isNaN(number) ? "-" : number
        return numberScore
    }

    const setStates = useCallback((scoreWithWords: string, status: number, page:pageType) => {
        setMyScore(parseScore(scoreWithWords))
        setMyScoreWithWords(scoreWithWords)
        setStatus(statusArray[status])
        setPage(page)
    }, [])

    const updateStatus = (status: string) => {
        if (statusArray[0] === status) setStates("", 0, "")
        else if (statusArray[1] === status) setStates(myScoreWithWords, 1, page !== "" ? page : 1)
        else if (statusArray[2] === status) setStates(myScoreWithWords, 2, pageCount)
        else if (statusArray[3] === status) setStatus(status)
        else if (statusArray[4] === status) setStatus(status)
        else setStates("", 0, "")
        setChanged(true)
    }

    const updatePageCount = (page: pageType) => {
        if (page === pageCount) setStates(myScoreWithWords, 2, pageCount)//setStatus("Finished")
        else if (page === "") setStates("-", 0, "")//setStatus(statusArray[0])
        else if (page <= pageCount) setStates(myScoreWithWords, 1, page)//setStatus("Reading")
        setChanged(true)
    }

    const updateScore = (scoreWithWords: string) => {
        if (status === statusArray[0]) setStates(scoreWithWords, 1, 1)
        else setStates(scoreWithWords, statusObj[status], page)
        setChanged(true)
    }

    const pageHandler = (e: FormEvent<HTMLInputElement>) => {
        const number = parseInt(e.currentTarget.value)
        if (number <= pageCount) updatePageCount(number)
        else if (Number.isNaN(number)) updatePageCount("")
    }

    const submitHandler = async () => {
        if (changed === false) return
        const finishDate = statusObj[status] <= 1 ? new Date(0) : new Date()
        const request: AddUserbookType = {
            book: book,
            userbook: {
                score: parseInt(`${myScore}`),
                status: statusObj[status],
                page: page === "" ? -1 : page,
                username: data.username,
                bookid: book.id,
                dateFinished: finishDate
            }
        }
        if (isAlreadyBook.current) {
            const req:AddUserbookBookType = request.userbook
            const res = await fetch("/api/userbook/updateUserbook", {
                method: 'POST',
                body: JSON.stringify(req),
                headers: { "Content-Type": "application/json" }
            })
            const body = await res.json()
        }
        else {
            const res = await fetch("/api/userbook/addUserbook", {
                method: 'POST',
                body: JSON.stringify(request),
                headers: { "Content-Type": "application/json" }
            })
            const body = await res.json()
        }
        setChanged(false);
    }

    useEffect(() => {
        if (!userbook) return
        const {score, status, page} = userbook
        setStates(scoreArray[10-score], status, page)
        isAlreadyBook.current = true
    }, [setStates, userbook])

    return (
        <div className={styles.container}>
            <div className={styles.scores}>
                <div className={styles.score}>
                    <h2 className={styles.scoreTitle}>SCORE</h2>
                    <h1 className={styles.scoreRating}>4</h1>
                </div>
                <hr/>
                <div className={styles.score}>
                    <h2 className={styles.scoreTitle}>MY SCORE</h2>
                    <DropDownButton buttons={scoreArray} state={myScore.toString()} setState={updateScore}/>
                </div>
                <hr/>
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
                <button className={styles.submitButton} style={!changed ? {backgroundColor: "var(--theme-light-light-grey)"}: {}} onClick={submitHandler}>
                    SUMBIT
                </button>
            </div>
        </div>
    )
}