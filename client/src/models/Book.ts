import { BookType } from "@/app/bookexample"
import prisma from "@/prisma/db"
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

    static async bookidMake(bookid: string): Promise<[BookPrismaType|null, string]> {
        try {
            const book = await prisma.book.findUnique({
                where: {bookid}
            })
            return [book, ""]
        } catch (error) {
            return [null, `${error}`]
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
            return Book.apiBookValidation(data)
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

    static async apiBookValidation(book: any) {
        let base:BookType = {
            kind: "books#volume",
            id: "",
            etag: "",
            selfLink: "",
            volumeInfo: {
              title: "",
              authors: [""],
              publisher: "",
              publishedDate: "",
              description: "",
              industryIdentifiers: [
                {
                  type: "",
                  identifier: ""
                }
              ],
              pageCount: 0,
              dimensions: {
                height: "",
                width: "",
                thickness: ""
              },
              printType: "BOOK",
              mainCategory: "",
              categories: [""],
              averageRating: 0,
              ratingsCount: 0,
              contentVersion: "",
              imageLinks: {
                smallThumbnail: "",
                thumbnail: "",
                small: "",
                medium: "",
                large: "",
                extraLarge: "",
              },
              language: "en",
              infoLink: "",
              canonicalVolumeLink: ""
            },
            saleInfo: {
              country: "",
              saleability: "",
              isEbook: false,
              listPrice: {
                amount: 0,
                currencyCode: ""
              },
              retailPrice: {
                amount: 0,
                currencyCode: ""
              },
              buyLink: ""
            },
            accessInfo: {
              country: "",
              viewability: "",
              embeddable: false,
              publicDomain: false,
              textToSpeechPermission: "",
              epub: {
                isAvailable: true,
                acsTokenLink: ""
              },
              pdf: {
                isAvailable: false
              },
              accessViewStatus: ""
            }
        }
        let vol = {
            title: "",
            authors: [""],
            publisher: "",
            publishedDate: "",
            description: "",
            industryIdentifiers: [
              {
                type: "",
                identifier: ""
              }
            ],
            pageCount: 0,
            dimensions: {
              height: "",
              width: "",
              thickness: ""
            },
            printType: "BOOK",
            mainCategory: "",
            categories: [""],
            averageRating: 0,
            ratingsCount: 0,
            contentVersion: "",
            imageLinks: {
              smallThumbnail: "",
              thumbnail: "",
              small: "",
              medium: "",
              large: "",
              extraLarge: "",
            },
            language: "en",
            infoLink: "",
            canonicalVolumeLink: ""
        }
        base.id = book.id;
        base.kind = book.kind;
        const volInfo = book.volumeInfo;
        if (volInfo) vol = {...vol, ...volInfo};
        base.volumeInfo = vol;
        return base
    }
}