import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    const body = await req.json()

    const bookName = body.bookName
    if (!Book.checkBookName(bookName)) return NextResponse.json({status: 400, body: "Book must be between 1 and 100 characters long"})

    const books = await Book.queryBooks(bookName)
    return NextResponse.json(books)
}