import { prisma } from "@/prisma/db"

type addGenreInput = {
    genre: string,
    username: string
}

export default class GenreSuggestion {
    static async addSuggestion(genreSuggestions: addGenreInput[]) {
        const res = await prisma.genreSuggestion.createMany({
            data: genreSuggestions
        })
        prisma.$disconnect()
        return res
    }
    static async getSuggestions() {
        const res = await prisma.genreSuggestion.findMany({
            take: 5,
            orderBy: {
                genresuggestionid: 'desc'
            },
        })
        prisma.$disconnect()
        return res
    }
}