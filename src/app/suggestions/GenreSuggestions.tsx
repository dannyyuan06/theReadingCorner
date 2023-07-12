'use client'
import { useState } from 'react'
import styles from './Suggestions.module.css'
import { AddGenre } from './AddGenre'
import { GenreAttachment } from './GenreAttachment'

export const genres = { 
    Autobiography: "Autobiography",
    Comedy: "Comedy",
    Cookgenre: "Cookgenre",
    Drama: "Drama",
    Essay: "Essay",
    FantasyFiction: "Fantasy Fiction",
    Fiction: "Fiction",
    GothicFiction: "Gothic Fiction",
    GraphicNovel: "Graphic Novel",
    HighFantasy: "High Fantasy",
    History: "History",
    Horror: "Horror",
    Legend: "Legend",
    Memoir: "Memoir",
    Narrative: "Narrative",
    NonFiction: "Non-fiction",
    Novel: "Novel",
    Philosophy: "Philosophy",
    Poetry: "Poetry",
    Politics: "Politics",
    Romance: "Romance",
    ScienceFiction: "Science Fiction",
    ShortStory: "Short Story",
    Spirituality: "Spirituality",
    Tragedy: "Tragedy",
    TravelLiterature: "Travel Literature"
}

export function GenreSuggestions() {

    const [didAddGenre, setDidAddGenre] = useState(false)
    const [genres, setGenres] = useState<string[]>([])
    return (
        <div className={styles.container}>
            <h2>GENRE SUGGESTION</h2>
            <div className={styles.genresContainer}>
                {genres.map((genre: string, index:number) => (
                    <GenreAttachment key={genre} genre={genre} index={index} setGenres={setGenres}/>
                ))}
            </div>
            <button className={styles.addButton} onClick={() => setDidAddGenre(true)}>ADD GENRE</button>
            <button className={styles.submitButton} style={genres.length === 0 ? {backgroundColor: "var(--theme-light-light-grey)", color: 'black'}: {}}>SUBMIT</button>
            {didAddGenre && <AddGenre setDidAddGenre={setDidAddGenre} setGenres={setGenres}/>}
        </div>
    )
}