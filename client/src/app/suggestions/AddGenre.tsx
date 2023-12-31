'use client'
import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useEffect, useState } from "react"
import { PageHeader } from "../components/PageHeader"
import styles from "./AddGenre.module.css"
import { genres } from "./GenreSuggestions"

export function AddGenre({setDidAddGenre, setGenres}: {setDidAddGenre: Dispatch<SetStateAction<boolean>>, setGenres: Dispatch<SetStateAction<string[]>>}) {
    const [selectedGenre, setSelectedGenre] = useState<string|null>(null)
    const [bookInputText, setBookInputText] = useState("")
    const [noGenreSelected, setNoGenreSelected] = useState(-1)
    const [genresDisplayed, setGenresDisplayed] = useState(genres)

    useEffect(() => {
        selectedGenre === null ? setNoGenreSelected(p => p !== -1 ? 0 : -1) : setNoGenreSelected(p => p !== -1 ? 1 : -1)
    },[selectedGenre])

    const submitHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        selectedGenre === null ? setNoGenreSelected(0) : setNoGenreSelected(1)
        if (selectedGenre !== null) {
            setGenres(prev => [...prev, selectedGenre!])
            setDidAddGenre(false)
        }
    }

    const cancelHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        setDidAddGenre(false)
    }

    const inputHander = (e: ChangeEvent<HTMLInputElement>) => {
        setBookInputText(e.target.value)
    }
    
    useEffect(() => {
        if (bookInputText === "") setGenresDisplayed(genres)
        else setGenresDisplayed(prev => prev.filter((genre) => genre.toLowerCase().includes(bookInputText.toLowerCase())))
    }, [bookInputText])

    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <PageHeader>ADD GENRE</PageHeader>
                <form className={styles.form} onSubmit={submitHandler}>
                    <label htmlFor="genreName">Genre Name</label>
                    <input type="text" name="genreName" onLoad={inputHander} onChange={inputHander}/>
                    <div className={styles.genresDropDown}>
                        <DropDownMenu buttons={genresDisplayed} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre}/>
                    </div>
                    <div className={styles.finishButtons}>
                        <div className={styles.notSelectedGenre}>{noGenreSelected === 0 && "Please select a genre"}</div>
                        <button className={styles.cancelButton} onClick={cancelHandler}>Cancel</button>
                        <input className={styles.submitButton} type="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

function DropDownMenu({selectedGenre, buttons, setSelectedGenre}: {selectedGenre: string|null, buttons: string[], setSelectedGenre: Dispatch<SetStateAction<string|null>>}) {

    return (
        <div className={styles.dropContainer} >
            {buttons.map((button: string) => <DropDownMenuButton key={button} name={button} genreId={button} setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre}/>)}
        </div>
    )
}

function DropDownMenuButton({ name, setSelectedGenre, genreId, selectedGenre}: {name: string, setSelectedGenre: Dispatch<SetStateAction<string|null>>, genreId: string, selectedGenre: string|null}) {

    const clickHandler = (e: SyntheticEvent) => {
        e.preventDefault()
        setSelectedGenre(genreId)
    }

    return (
        <button style={selectedGenre === genreId ? {backgroundColor: 'var(--theme-blue)', color: 'white'}: {}} className={styles.button} onClick={clickHandler}>
            <span>{name}</span>
        </button>
    )
}