import { prisma } from "@/prisma/db"

export const booksInit = {
    bookid: -1,
    bookPicture: "",
    title: "",
    author: "",
    description: "",
}

export type booksType = typeof booksInit

export default class Book {
    bookid: number
    bookPicture: string
    title: string
    author: string
    description: string

    constructor (
        bookid: number,
        bookPicture: string,
        title: string,
        author: string,
        description: string,
    ) {
        this.bookid = bookid
        this.bookPicture = bookPicture
        this.title = title
        this.author = author
        this.description = description
    }

    static async bookidMake(bookid: number) {
        try {
            const book = await prisma.book.findUnique({
                where: {bookid}
            })
            return [book, ""]
        } catch (error) {
            return [null, error]
        }
    }
}