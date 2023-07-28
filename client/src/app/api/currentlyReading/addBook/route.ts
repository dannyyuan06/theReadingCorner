import { BookType } from "@/app/bookexample";
import Book from "@/models/Book";
import { CurrentlyReading } from "@/models/CurrentlyReading";
import { Book as BookPrismaType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body:BookType = await req.json()

    const book:BookPrismaType = {
        bookid: body.id,
        title: body.volumeInfo.title,
        pageCount: body.volumeInfo.pageCount,
        author: body.volumeInfo.authors.join(", "),
        description: body.volumeInfo.description,
        bookPicture: Object.values(body.volumeInfo.imageLinks)[0]
    }

    const [isBookPresent, err] = await Book.bookidMake(book.bookid)

    if (!isBookPresent) {
        await Book.addBookInDatabase(book)
    }

    const currentbook = {
        bookid: book.bookid,
        averageRating: 0,
        pageNumber: 0,
        status: 1
    }

    const currentlyReadingBook = CurrentlyReading.addCurrentlyReadingBook(currentbook)
    return NextResponse.json(currentlyReadingBook)
}