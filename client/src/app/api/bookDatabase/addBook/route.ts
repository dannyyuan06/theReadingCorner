import { BookType } from "@/app/bookexample";
import Book from "@/models/Book";
import { Book as BookPrismaType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";

export async function POST(req: NextRequest) {
    const body:BookType = await req.json()

    const [access, errRes] = await apiMiddleware(req, 0)
    if (!access) return errRes

    const book:BookPrismaType = {
        bookid: body.id,
        title: body.volumeInfo.title,
        pageCount: body.volumeInfo.pageCount,
        author: body.volumeInfo.authors.join(", "),
        description: body.volumeInfo.description,
        bookPicture: Object.values(body.volumeInfo.imageLinks)[0]
    }
    const [alreadyPresentBook, err] = await Book.bookidMake(body.id)
    
    if (alreadyPresentBook) return NextResponse.json(alreadyPresentBook)
    const returnBook = await Book.addBookInDatabase(book)
    return NextResponse.json(returnBook)
}