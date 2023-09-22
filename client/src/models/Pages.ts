import prisma from "@/prisma/db"
import { Book, BookSuggestions, CurrentlyReading, GenreSuggestion, Statistics } from "@prisma/client"
import { getMessagesType } from "./BulletinBoard"
import { getCurrentlyReadingBooksType } from "./CurrentlyReading"

export interface BookSuggestionWithBook extends BookSuggestions {
    book: Book
}

export interface CurrentlyReadingWithBook extends CurrentlyReading {
    book: {
        title: string,
        averageRating: number
    }
}

export type PageStats = {
    currentlyReadingBook: CurrentlyReadingWithBook|null,
    bookSuggestions: BookSuggestionWithBook[],
    genreSuggestions: GenreSuggestion[],
    numberOfMembers: number,
    booksRead: number,
    bulletinEngagement: number
}

type PageStatsPromise = [
    CurrentlyReadingWithBook|null,
    BookSuggestionWithBook[],
    GenreSuggestion[],
    number,
    number,
    number,
]

export interface StatsType {
    currentlyReadingBook: string,
    averageRating: number,
    numberOfMembers: number,
    bulletinBoardEngagement: number,
    booksRead: number,
}

export default class Pages {
    static async statistics(): Promise<[PageStats|null, string]>{
        try {
            const currentlyReadingBook = prisma.currentlyReading.findFirst({
                orderBy: {
                    dateStarted: 'desc'
                },
                include: {
                    book: {
                        select: {
                            title: true,
                            averageRating: true
                        }
                    }
                }
            })
            const bookSuggestions = prisma.bookSuggestions.findMany({
                take: 5,
                orderBy: {
                    booksuggestionid: 'desc'
                },
                include: {
                    book: true
                }
            })
            const genreSuggestions = prisma.genreSuggestion.findMany({
                take: 5,
                orderBy: {
                    genresuggestionid: 'desc'
                },
            })
            const numberOfMembers = prisma.users.count()
            const booksRead = prisma.currentlyReading.count()
            const res = prisma.statistics.findFirst()

            const promises = [currentlyReadingBook, bookSuggestions, genreSuggestions, numberOfMembers, booksRead, res]
            const data = await Promise.all(promises)

            const currentlyReadingBookR = data[0] as CurrentlyReadingWithBook|null
            const bookSuggestionsR = data[1] as BookSuggestionWithBook[]
            const genreSuggestionsR = data[2] as GenreSuggestion[]
            const numberOfMembersR = data[3] as number
            const booksReadR = data[4] as number
            const resR = data[5] as Statistics

            const bulletinEngagementR = resR ? resR.bulletinEngagement : 0;

            const alldata = { 
                currentlyReadingBook: currentlyReadingBookR, 
                bookSuggestions: bookSuggestionsR, 
                genreSuggestions: genreSuggestionsR, 
                numberOfMembers: numberOfMembersR, 
                booksRead: booksReadR, 
                bulletinEngagement: bulletinEngagementR 
            }
            
            return [alldata, ""]
        } catch (error) {
            return [null, `${error}`]
        }   
    }


    static async dashboard(): Promise<[{currentlyReadingBook: getCurrentlyReadingBooksType|null, messages: getMessagesType[]}|null, string]> {
        try {
            const currentlyReadingPromise = prisma.currentlyReading.findFirst({
                orderBy: {
                    readid: 'desc'
                },
                include: {
                    book: true
                }
            })
            const messagesPromise = prisma.bulletinBoardMessages.findMany({
                take: 5,
                orderBy: {
                    messageid: 'desc'
                },
                include: {
                    books: {
                        include: {
                            book: true
                        }
                    },
                    user: {
                        select: {
                            username: true,
                            firstName: true,
                            lastName: true,
                            lastOnline: true,
                            profilePicture: true,
                            joinDate: true,
                            accessLevel: true,
                        }
                    }
                }
            })
            const [currentlyReadingBook, messages] = await Promise.all([currentlyReadingPromise, messagesPromise])

            
            return [{currentlyReadingBook, messages}, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async dashboardAdmin(): Promise<[{currentlyReadingBook: getCurrentlyReadingBooksType|null, messages: getMessagesType[], stats: StatsType, bookSuggestions: BookSuggestionWithBook[], reportedMessages: getMessagesType[]}|null, string]> {
        try {
            const currentlyReadingPromise = prisma.currentlyReading.findFirst({
                orderBy: {
                    readid: 'desc'
                },
                include: {
                    book: true
                }
            })
            const messagesPromise = prisma.bulletinBoardMessages.findMany({
                take: 5,
                orderBy: {
                    messageid: 'desc'
                },
                include: {
                    books: {
                        include: {
                            book: true
                        }
                    },
                    user: {
                        select: {
                            username: true,
                            firstName: true,
                            lastName: true,
                            lastOnline: true,
                            profilePicture: true,
                            joinDate: true,
                            accessLevel: true,
                        }
                    }
                }
            })
            const bookSuggestionsPromise = prisma.bookSuggestions.findMany({
                take: 5,
                orderBy: {
                    booksuggestionid: 'desc'
                },
                include: {
                    book: true
                }
            })
            const reportedMessagesPromise = prisma.bulletinBoardMessages.findMany({
                where: {
                    reported: true,
                },
                include: {
                    books: {
                        include: {
                            book: true
                        }
                    },
                    user: true
                }
            })
            const numberOfMembersPromise = prisma.users.count()
            const booksReadPromise = prisma.currentlyReading.count()
            const statsPromise = prisma.statistics.findFirst()
            const [currentlyReadingBook, messages, bookSuggestions, numberOfMembers, booksRead, enages, reportedMessages] = await Promise.all([currentlyReadingPromise, messagesPromise, bookSuggestionsPromise, numberOfMembersPromise, booksReadPromise, statsPromise, reportedMessagesPromise])

            const stats:StatsType = {
                currentlyReadingBook: currentlyReadingBook!.book.title,
                numberOfMembers,
                bulletinBoardEngagement: enages?.bulletinEngagement ?? 0,
                averageRating: currentlyReadingBook!.book.averageRating,
                booksRead
            }

            return [{currentlyReadingBook, messages, stats, bookSuggestions, reportedMessages}, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }
}