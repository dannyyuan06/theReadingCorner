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

    static async queryBooks(bookname: string) {
        try {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
                bookname
              )}&maxResults=10&key=${process.env.GOOGLE_BOOKS_API_KEY}`
            );
      
            const data = await response.json();
            const booksData = data.items || [];
            return booksData
          } catch (error) {
            console.error('Error searching books:', error);
          }
    }
}