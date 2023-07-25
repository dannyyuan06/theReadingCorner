import { BookType } from "@/app/bookexample"
import { prisma } from "@/prisma/db"
import { Book as BookPrismaType } from "@prisma/client"

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

    static async bookidMake(bookid: string) {
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
            return null
          }
    }

    static checkBookName(bookName: string) {
        return bookName.length > 0 && bookName.length <= 100
    }

    static async getBookWithId(volumeId: string):Promise<BookType|null> {
        try {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${process.env.GOOGLE_BOOKS_API_KEY}`
            );
            const data = await response.json();
            return data
          } catch (error) {
            console.error('Error getting book by ID:', error);
          }
        return null
    }


    static async addBookInDatabase(book:BookPrismaType) {
      try {
        const res = await prisma.book.create({
          data: book
        })
        return res
      } catch (error) {
        console.error('Error getting book by ID:', error);
      }
      return null
    }
}