import { BookType } from "@/app/bookexample";
import Book from "@/models/Book";
import { CurrentlyReading } from "@/models/CurrentlyReading";
import { Book as BookPrismaType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body:BookType = await req.json()
    const res = await CurrentlyReading.updateCurrentlyReadingBook(body)
    return NextResponse.json({res})
}