import { BookType } from "@/app/bookexample"
import prisma from "@/prisma/db"
import { Book, Book as BookPrismaType, BookSuggestions } from "@prisma/client"

type addSuggestionInput = {
    bookid: string,
    username: string
}

export default class BookSuggestion {
    static async addSuggestion(bookSuggestions: addSuggestionInput[]) {
        const res = await prisma.bookSuggestions.createMany({
            data: bookSuggestions
        })
        
        return res
    }
    static async getSuggestions() {
        const res = await prisma.bookSuggestions.findMany({
            take: 5,
            orderBy: {
                booksuggestionid: 'desc'
            },
            include: {
                book: true
            }
        })
        
        return res
    }
}