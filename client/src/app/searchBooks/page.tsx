import Image from "next/image";
import { PageHeader } from "../components/PageHeader";
import styles from './page.module.css'
import { bookexample } from "../bookexample";
import { BookStandard } from "./BookStandard";

const bookValues = Object.values(bookexample)

export default function members() {

    return(
        <div>
            <PageHeader>SEARCH BOOKS</PageHeader>
            <div className={styles.searchBar}>
                <Image alt="Search Button" src="/images/search_icon.svg" width={30} height={30}/>
                <input className={styles.searchInput} type="search" results={2} placeholder="Search by username"/>
            </div>
            <div className={styles.profilesContainer}>
                <div className={styles.titles}>
                    <span style={{width: 70}}></span>
                    <h3 style={{flex: 2}}>BOOK TITLE</h3>
                    <h3 style={{flex: 2}}>AUTHOR(S)</h3>
                    <h3 style={{flex: 1}}>DATE PUBLISHED</h3>
                    <h3 style={{flex: 2}}>GENRE</h3>
                </div>
                {bookValues.map((value) => (
                    <BookStandard key={value.id} 
                                    bookTitle={value.volumeInfo.title} 
                                    authors={value.volumeInfo.authors.join(", ")} 
                                    datePublished={value.volumeInfo.publishedDate}
                                    genre={value.volumeInfo.mainCategory}
                                    image={value.volumeInfo.imageLinks.small}/>
                ))}
                {/* {membersUsers.map((values: user) => (
                    <ProfileStandard key={values.username} {... values}/>
                ))} */}
            </div>
        </div>
    )
}