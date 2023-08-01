import { BookType } from "@/app/bookexample";

export interface AddUserbookBookType {
    score: number,
    status: number,
    page: number,
    username: string,
    bookid: string,
    dateFinished: Date,
}

export interface AddUserbookType {
    book: BookType,
    userbook: AddUserbookBookType
}