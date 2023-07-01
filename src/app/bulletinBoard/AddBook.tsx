'use client'
import { Dispatch, SetStateAction, SyntheticEvent } from "react"
import { PageHeader } from "../components/PageHeader"
import styles from "./AddBook.module.css"

export function AddBook({setDidAddBook}: {setDidAddBook: Dispatch<SetStateAction<boolean>>}) {

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        setDidAddBook(false)
    }

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <PageHeader>ADD BOOK</PageHeader>
                <form className={styles.form} onSubmit={submitHandler}>
                    <label htmlFor="bname">Book Name</label>
                    <input type="text" name="bname"/>
                    <label htmlFor="lname">Author</label>
                    <input type="text" name="lname"/>
                    <div className={styles.booksDropDown}>
                        <DropDownMenu buttons={["something", "something"]} />
                    </div>
                    <input className={styles.submitButton} type="submit"/>
                </form>
            </div>
        </div>
    )
}

function DropDownMenu({buttons}: {buttons: string[]}) {
    //style={{top: position[0], left: position[1]}}
    return (
        <div className={styles.dropContainer} >
            {buttons.map((button: string) => <DropDownMenuButton key={button} name={button}/>)}
        </div>
    )
}

function DropDownMenuButton({ name }: {name: string, }) {
    return (
        <button className={styles.button}>
            <span>{name}</span>
        </button>
    )
}