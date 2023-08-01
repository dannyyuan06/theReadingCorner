import { BookType } from "@/app/bookexample";
import { CurrentlyReading } from "@/models/CurrentlyReading";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";

export async function POST(req: NextRequest) {
    const body:BookType = await req.json()

    const [access, errRes] = await apiMiddleware(req, 3)
    if (!access) return errRes

    const res = await CurrentlyReading.updateCurrentlyReadingBook(body)
    return NextResponse.json({res})
}