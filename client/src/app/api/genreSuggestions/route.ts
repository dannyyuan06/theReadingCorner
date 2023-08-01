import { GenreSuggestionType } from "@/lib/types/fetchTypes/genreSuggestion";
import GenreSuggestion from "@/models/GenreSuggestion";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../middleware";

export async function POST(req: NextRequest) {
    const body: GenreSuggestionType[] = await req.json()

    const [access, errRes] = await apiMiddleware(req, 0)
    if (!access) return errRes

    const suggestions = body

    const genres = await GenreSuggestion.addSuggestion(suggestions)
    return NextResponse.json(genres)
}