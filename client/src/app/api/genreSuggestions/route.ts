import GenreSuggestion from "@/models/GenreSuggestion";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()

    const suggestions = body

    const genres = await GenreSuggestion.addSuggestion(suggestions)
    return NextResponse.json(genres)
}