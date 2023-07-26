import { BookType } from "@/app/bookexample";
import Book from "@/models/Book";
import User from "@/models/User";
import { Book as BookPrismaType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json()
    const [userbookReturn, error] = await User.updateReadBook(body)
    console.log(error)
    return NextResponse.json(userbookReturn)
}