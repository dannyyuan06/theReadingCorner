import Book from "@/models/Book";
import BookSuggestion from "@/models/BookSuggestion";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../middleware";
import { BookSuggestionType } from "@/lib/types/fetchTypes/bookSuggestion";

export async function POST(req: NextRequest) {
    const body:BookSuggestionType[] = await req.json()

    const [access, errRes] = await apiMiddleware(req, 0)
    if (!access) return errRes

    const suggestions = body

    const book = await BookSuggestion.addSuggestion(suggestions)
    return NextResponse.json(book)
}