'use client'
import { FormEvent, useEffect, useState } from 'react'
import styles from './BookRatings.module.css'
import { DropDownButton } from '@/app/components/DropDownButton'

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

const statusArray = [
    "Haven't Read",
    "Reading",
    "Finished",
    "On Hold",
    "Dropped"
]

let pageTimeout: NodeJS.Timeout

export function BookRatings({pageCount}: {pageCount: number}) {

    const [myScore, setMyScore] = useState<string|number>("-")
    const [myScoreWithWords, setMyScoreWithWords] = useState<string>("")
    const [status, setStatus] = useState<string>(statusArray[0])
    const [page, setPage] = useState<pageType>("")
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if (myScore === "-") {
            setStatus(statusArray[0])
        }
        else {
            setStatus(statusArray[1])
        }
    }, [myScore])

    useEffect(() => {
        const number = parseInt(myScoreWithWords)
        setMyScore(Number.isNaN(number) ? "-" : number)
    }, [myScoreWithWords])

    useEffect(() => {
        if (status === statusArray[0]) {setPage("");setMyScore("-")}
        else if (status === statusArray[1]) setPage(p => p === "" ? 1 : p)
        else if (status === statusArray[2]) setPage(pageCount)
    }, [status, pageCount])

    useEffect(() => {
        clearTimeout(pageTimeout)
        pageTimeout = setTimeout(() => {
            if (page === pageCount) setStatus("Finished")
            else if (page === "") setStatus(statusArray[0])
            else if (page <= pageCount) setStatus("Reading")
        }, 1000);
        setChanged(true)
    }, [page, pageCount])


    const pageHandler = (e: FormEvent<HTMLInputElement>) => {
        const number = parseInt(e.currentTarget.value)
        console.log(number)
        if (number <= pageCount) {
            setPage(number)
        }
        else if (Number.isNaN(number)) {
            setPage("")
        }
    }

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
                    <DropDownButton buttons={scoreArray} state={myScore.toString()} setState={setMyScoreWithWords}/>
                </div>
                <hr/>
                <div className={styles.score}>
                    <h2 className={styles.scoreTitle}>STATUS</h2>
                    <DropDownButton buttons={statusArray} state={status} setState={setStatus}/>
                </div>
                <hr/>
                <div className={styles.score}>
                    <h2 className={styles.scoreTitle}>PAGE</h2>
                    <h1 className={styles.scoreRating}>
                        <input type='number' onInput={pageHandler} value={page} className={styles.pageNumber + " " + styles.inputType} max={217} min={0} step={1}/>
                        <span className={styles.totalPages}>/{pageCount}</span></h1>
                </div>
            </div>
            <div className={styles.submitButtonWrapper}>
                <button className={styles.submitButton}>
                    SUMBIT
                </button>
            </div>
        </div>
    )
}