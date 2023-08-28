import { prisma } from "@/prisma/db"
import { Book } from "@prisma/client";
import { headers } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

interface bookWithUser extends Book {
    usersRead: {
        score: number
    }[]
}

async function updateBooks() {
    const books = await prisma.book.findMany({
        include: {
            usersRead: {
                select: {
                    score: true
                }
            }
        }
    })

    const updateBook = (bookid:string, average:number) => {
        const bookPromise = prisma.book.update({
            where: {bookid},
            data: {
                averageRating: isNaN(average) ? -1 : average
            },
            select: {bookid: true,}
        })
        return bookPromise;
    }

    const getAverages = (book: bookWithUser) => {
        const userTotalScores = book.usersRead.reduce((prev, curr) => prev + curr.score, 0);
        const average = userTotalScores / book.usersRead.length;
        return updateBook(book.bookid, average)
    }
    
    const averagePromises = books.map(book => getAverages(book))
    const settledAverages = Promise.all(averagePromises)

    return settledAverages
}

async function engagement() {
    const users = await prisma.users.findMany({
        select: {
            lookedAtBulletin: true
        }
    })
    const totalLookedAtBulletin = users.reduce((prev, curr) => prev + Number(curr.lookedAtBulletin), 0)
    const engagement = totalLookedAtBulletin / users.length

    const engagementPromise = prisma.statistics.update({
        where: {statid: 1},
        data: {
            bulletinEngagement: isNaN(engagement) ? 0 : engagement
        },
        select: {statid: true,}
    })
    return engagementPromise
}

export async function PUT(req: NextRequest) {
    const headerlist = headers()
    const auth = headerlist.get("Authorization")
    if (auth !== process.env.GOOGLE_SCHEDULER_SECRET) return NextResponse.json({error: "Unauthorized"}, {status: 401,})
    try {
        const updateBookPromise = updateBooks();
        const engagementPromise = engagement();
        await Promise.all([updateBookPromise, engagementPromise])
        return NextResponse.json({success: "Success"}, {
            status: 200,
        })
    } catch (err) {
        return NextResponse.json({error: `${err}`}, {
            status: 500,
        })
    }
}