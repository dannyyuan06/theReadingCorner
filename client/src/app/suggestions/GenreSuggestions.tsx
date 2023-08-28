'use client'
import { useState } from 'react'
import styles from './Suggestions.module.css'
import { AddGenre } from './AddGenre'
import { GenreAttachment } from './GenreAttachment'
import { useSession } from 'next-auth/react'
import { GenreSuggestionType } from '@/lib/types/fetchTypes/genreSuggestion'
import useAuthSession from '@/redux/useAuthSession'

export const genres = [
     "Autobiography",
     "Comedy",
     "Cookgenre",
     "Drama",
     "Essay",
     "Fantasy Fiction",
     "Fiction",
     "Gothic Fiction",
     "Graphic Novel",
     "High Fantasy",
     "History",
     "Horror",
     "Legend",
     "Memoir",
     "Narrative",
     "Non-fiction",
     "Novel",
     "Philosophy",
     "Poetry",
     "Politics",
     "Romance",
     "Science Fiction",
     "Short Story",
     "Spirituality",
     "Tragedy",
     "Travel Literature"
]

export function GenreSuggestions() {

    const [didAddGenre, setDidAddGenre] = useState(false)
    const [genres, setGenres] = useState<string[]>([])
    const user = useAuthSession()

    const onSubmit = async () => {
        const req:GenreSuggestionType[] = genres.map((genre) => ({genre: genre, username:user?.username ?? ""}))
        const res = await fetch("/api/genreSuggestions", {
            method: 'POST',
            body: JSON.stringify(req),
            headers: { "Content-Type": "application/json" }
        })
        const body = await res.json()
        setGenres([])
    }

    return (
        <div className={styles.container}>
            <h2>GENRE SUGGESTION</h2>
            <div className={styles.genresContainer}>
                {genres.map((genre: string, index:number) => (
                    <GenreAttachment key={genre} genre={genre} index={index} setGenres={setGenres}/>
                ))}
            </div>
            <button className={styles.addButton} onClick={() => setDidAddGenre(true)}>ADD GENRE</button>
            <button className={styles.submitButton} onClick={onSubmit} style={genres.length === 0 ? {backgroundColor: "var(--theme-light-light-grey)", color: 'black'}: {}}>SUBMIT</button>
            {didAddGenre && <AddGenre setDidAddGenre={setDidAddGenre} setGenres={setGenres}/>}
        </div>
    )
}