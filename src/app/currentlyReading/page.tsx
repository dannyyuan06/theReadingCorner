import { PageHeader } from "../components/PageHeader";
import { CurrentlyReadingBook } from "./CurrentlyReadingBook";
import { PastReadingBook } from "./PastReadingBook";



export default function currentlyReading() {
    return(
        <div>
            <PageHeader>CURRENTLY READING</PageHeader>
            <CurrentlyReadingBook/>
            <PastReadingBook/>
        </div>
    )
}