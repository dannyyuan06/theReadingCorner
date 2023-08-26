'use client'
import Image from "next/image";
import { PageHeader } from "../components/PageHeader";
import styles from './page.module.css'
import { BookType } from "../bookexample";
import { BookStandard } from "./BookStandard";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../loading/Loading";

export default function SearchBooks() {
    const [bookValues, setBookValues] = useState<BookType[]>([])
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter()

    const fetchBooks = async (bookQuery: string) => {
        const res = await fetch(`/api/books/${bookQuery}`,{
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })
        const body:BookType[] = await res.json()
        return body
    }

    useEffect(() => {
        setLoading(true)
        const searched = searchParams.get('search')
        if (!searched) return setLoading(false)
        fetchBooks(searched).then((books) => {
            setBookValues(books)
            setLoading(false)
        })
    },[searchParams])
    

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const bookQuery = formData.get("search")!.toString()
        const URLParams = new URLSearchParams({search: bookQuery})
        router.push(`/searchBooks?${URLParams}`)
    }

    return(
        <div>
            <PageHeader>SEARCH BOOKS</PageHeader>
            <div className={styles.searchBar}>
                <Image alt="Search Button" src="/images/search_icon.svg" width={30} height={30}/>
                <form onSubmit={submitHandler} className={styles.searchForm}>
                    <input className={styles.searchInput} type="search" name="search" results={2} placeholder="Search by book title"/>
                </form>
            </div>
            <div className={styles.profilesContainer}>
                {loading && 
                    <Loading/>
                }
                {bookValues.length !== 0
                && <div className={styles.titles}>
                    <span style={{width: 70}}></span>
                    <h3 style={{flex: 2}}>BOOK TITLE</h3>
                    <h3 style={{flex: 2}}>AUTHOR(S)</h3>
                    <h3 style={{flex: 1}}>DATE PUBLISHED</h3>
                    <h3 style={{flex: 2}}>GENRE</h3>
                </div>
                }
                {bookValues.map((value) => (
                    <BookStandard
                        key={value.id} 
                        bookId={value.id}
                        bookTitle={value.volumeInfo.title} 
                        authors={value.volumeInfo.authors ? value.volumeInfo.authors.join(", ") : ""} 
                        datePublished={value.volumeInfo.publishedDate}
                        genre={value.volumeInfo.categories ? value.volumeInfo.categories.join(", "): ""}
                        image={ value.volumeInfo.imageLinks ? Object.values(value.volumeInfo.imageLinks)[0] : '/images/book-placeholder.png'}
                    />
                ))}
            </div>
        </div>
    )
}