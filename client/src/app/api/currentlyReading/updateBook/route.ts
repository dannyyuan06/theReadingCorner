import { CurrentlyReading } from "@/models/CurrentlyReading";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";
import { CurrentlyReadingUpdate, CurrentlyReadingUpdatePrisma } from "@/lib/types/fetchTypes/currentlyReading";

export async function POST(req: NextRequest) {
    const body:CurrentlyReadingUpdate = await req.json()

    const [access, errRes] = await apiMiddleware(req, 3)
    if (!access) return errRes

    const updatedBook:CurrentlyReadingUpdatePrisma = {
        ...body,
        pageNumber: body.pageNumber === "" ? -1 : body.pageNumber
    }

    const res = await CurrentlyReading.updateCurrentlyReadingBook(updatedBook)
    return NextResponse.json({res})
}