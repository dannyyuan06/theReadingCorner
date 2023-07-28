import Book from "@/models/Book";
import BookSuggestion from "@/models/BookSuggestion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const suggestions = body

    const book = await BookSuggestion.addSuggestion(suggestions)
    return NextResponse.json(book)
}

export async function GET(req: NextRequest) {
    const books = await BookSuggestion.getSuggestions()
    return NextResponse.json(books)
}