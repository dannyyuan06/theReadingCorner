import { BookType } from "@/app/bookexample";
import Book from "@/models/Book";
import User from "@/models/User";
import { Book as BookPrismaType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const sentBook = body.book
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
    console.log(error)
    return NextResponse.json(userbookReturn)
}