import { BookType } from "@/app/bookexample";
import Book from "@/models/Book";
import User from "@/models/User";
import { Book as BookPrismaType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../middleware";
import { AddUserbookType } from "@/lib/types/fetchTypes/addUserbook";

export async function POST(req: NextRequest) {
    const body: AddUserbookType = await req.json()
    const [access, res] = await apiMiddleware(req, 0, body.userbook.username)
    if (!access) return res
    const sentBook:BookType = body.book
    const sendBook:BookPrismaType = {
        bookid: sentBook.id,
        title: sentBook.volumeInfo.title,
        pageCount: sentBook.volumeInfo.pageCount,
        author: sentBook.volumeInfo.authors.join(", "),
        description: sentBook.volumeInfo.description,
        bookPicture: Object.values(sentBook.volumeInfo.imageLinks)[0]!.toString()
    }
    
    let [alreadyPresentBook, err] = await Book.bookidMake(sentBook.id)
    if (!alreadyPresentBook) alreadyPresentBook = await Book.addBookInDatabase(sendBook)
    
    const [userbookReturn, error] = await User.addReadBook(body.userbook)
    return NextResponse.json(userbookReturn)
}