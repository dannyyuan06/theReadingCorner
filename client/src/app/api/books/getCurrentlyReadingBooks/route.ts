import Book from "@/models/Book";
import { CurrentlyReading } from "@/models/CurrentlyReading";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     const user:any = await getToken({req})
//     console.log(user)
//     const book = await CurrentlyReading.getCurrentlyReadingBooks(user.username)
//     return NextResponse.json(book)
// }