import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const bookId = body.bookId

    const book = await Book.getBookWithId(bookId)
    return NextResponse.json(book)
}