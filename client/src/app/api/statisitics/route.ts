import { prisma } from "@/prisma/db"
import { Book } from "@prisma/client";

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

export async function PUT(req: Request) {
    
    try {
        const updateBookPromise = updateBooks();
        const engagementPromise = engagement();
        await Promise.all([updateBookPromise, engagementPromise])
        return new Response('Success', {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })
    } catch (err) {
        return new Response(`Error: ${err}`, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        })
    }
}