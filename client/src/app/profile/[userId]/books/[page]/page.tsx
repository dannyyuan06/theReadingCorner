import { PageHeader } from "@/app/components/PageHeader"
import User from "@/models/User"
import styles from './page.module.css'
import { SmallBook } from "../../SmallBook";
import Link from "next/link";


export default async function UserPage({ params }: {params: {page: string, userId: string}}) {
    const pageNumber = parseInt(params.page)

    const [books, err] = await User.paginationBooks(pageNumber, params.userId);

    if (pageNumber < 1 || !books) return (
        <div>
            <PageHeader>
                INVALID PAGE
            </PageHeader>
        </div>
    )
    return (
        <div>
            <PageHeader>
                {params.userId}&apos;S BOOKS
            </PageHeader>
            <Buttons username={params.userId} page={pageNumber} length={books.length}/>
            <div className={styles.booksContainer}>
                {books.map((userbook) => (
                    <SmallBook key={userbook.bookid} userbook={userbook}/>
                ))}
            </div>
            <Buttons username={params.userId} page={pageNumber} length={books.length}/>
        </div>
    )
}

function Buttons({username, page, length}: {username:string, page: number, length:number}) {

    const isLeftAv = page > 1
    const isRightAv = length === 40

    return (
        <div className={styles.buttonContainer}>
            <Link href={`/profile/${username}`} className={styles.link + " " + styles.back}>BACK TO PROFILE</Link>
            <div className={styles.pageButtonContainer}>
                {isLeftAv && <Link href={`/profile/${username}/books/${page+1}`} className={styles.link + " " + styles.prev}>PREVIOUS PAGE</Link>}
                {isRightAv && <Link href={`/profile/${username}/books/${page-1}`} className={styles.link + " " + styles.next}>NEXT PAGE</Link>}
            </div>
        </div>
    )
}