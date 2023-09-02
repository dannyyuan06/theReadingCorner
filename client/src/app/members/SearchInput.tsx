"use client"
import Image from 'next/image'
import styles from './SearchInput.module.css'
import { useSearchParams } from 'next/navigation';

export default function SearchInput() {
    const searchParams = useSearchParams();

    const submitHandler = () => {

    }

    return (
        <form onSubmit={submitHandler}>
            <div className={styles.searchBar}>
                <Image alt="Search Button" src="/images/search_icon.svg" width={30} height={30}/>
                <input className={styles.searchInput} type="search" results={2} placeholder="Search by username"/>
            </div>
        </form>
    )
}