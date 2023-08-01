import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";



export async function POST(req: NextRequest) {
    const body:{bookName: string} = await req.json()
    
    const [access, errRes] = await apiMiddleware(req, 0)
    if (!access) return errRes

    const bookName = body.bookName
    if (!Book.checkBookName(bookName)) return NextResponse.json({status: 400, body: "Book must be between 1 and 100 characters long"})

    const books = await Book.queryBooks(bookName)
    return NextResponse.json(books)
}