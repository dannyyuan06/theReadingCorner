import Book from "@/models/Book";
import { CurrentlyReading } from "@/models/CurrentlyReading";
import { Book as BookPrismaType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../middleware";
import { CurrentlyReadingInput, CurrentlyReadingType } from "@/lib/types/fetchTypes/currentlyReading";

export async function POST(req: NextRequest) {
    const body:CurrentlyReadingType = await req.json()

    const [access, errRes] = await apiMiddleware(req, 3)
    if (!access) return errRes

    const book:BookPrismaType = {
        bookid: body.id,
        title: body.volumeInfo.title,
        pageCount: body.volumeInfo.pageCount,
        author: body.volumeInfo.authors.join(", "),
        description: body.volumeInfo.description,
        averageRating: -1,
        bookPicture: Object.values(body.volumeInfo.imageLinks)[0]
    }

    const [isBookPresent, _] = await Book.bookidMake(book.bookid)

    if (!isBookPresent) {
        await Book.addBookInDatabase(book)
    }

    const currentbook:CurrentlyReadingInput = {
        bookid: book.bookid,
        averageRating: 0,
        pageNumber: 0,
        affiliateLink: body.affiliateLink,
        status: 1
    }

    const [currentlyReadingBook, error] = await CurrentlyReading.addCurrentlyReadingBook(currentbook)

    if (!currentlyReadingBook) return NextResponse.json({error}, {status: 500})

    return NextResponse.json(currentlyReadingBook)
}