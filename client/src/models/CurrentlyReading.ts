import { prisma } from "@/prisma/db";
import { Book, UserBook, CurrentlyReading as CurrentlyReadingPrismaType } from "@prisma/client";

interface bookWithUserType extends Book {
    usersRead: UserBook[]
}

export interface getCurrentlyReadingBooksType extends CurrentlyReadingPrismaType {
    book: Book
}

export class CurrentlyReading {
    static async getCurrentlyReadingBooks(): Promise<[getCurrentlyReadingBooksType[]|null, string]> {
        try {
            const res = await prisma.currentlyReading.findMany({
                take: 8,
                orderBy: {
                    readid: 'desc'
                },
                include: {
                    book: true
                }
            })
            return [res, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }
    static async addCurrentlyReadingBook(currentlyReadingBook: any) {
        try {
            const res = await prisma.currentlyReading.create({
                data: currentlyReadingBook
            })
        } catch (error) {
            return [null, `${error}`]
        }
    }
    static async updateCurrentlyReadingBook(currentlyReadingBook: any) {
        const {readid, ...updateData} = currentlyReadingBook
        try {
            const res = await prisma.currentlyReading.update({
                where: {
                    readid: readid
                },
                data: updateData
            })
            return [res, ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }
}