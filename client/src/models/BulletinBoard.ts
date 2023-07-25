import { prisma } from "@/prisma/db";
import { Book, BulletinBoardBooks, BulletinBoardMessages, Users } from "@prisma/client";

interface booksRelationshipType extends BulletinBoardBooks {
    book: Book
}

export interface getMessagesType extends BulletinBoardMessages {
    user: Users,
    books: booksRelationshipType[]
}

export interface messagesWithBook extends BulletinBoardMessages {
    books: Book[]
}

export class BulletinBoard {
    static async getMessages() {
        const rest:getMessagesType[] = await prisma.bulletinBoardMessages.findMany({
            take: 10,
            orderBy: {
                messageid: 'desc'
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
        return rest
    }
 
    static async addMessage(message: messagesWithBook) {
        const res = await prisma.bulletinBoardMessages.create({
            data: {
                body: message.body,
                username: message.username,
            }
        })
        const bookObject = message.books.map((book) => ({
            bookid: book.bookid,
            messageid: res.messageid
        }))
        await prisma.bulletinBoardBooks.createMany({
            data: bookObject,
            skipDuplicates: true
        })
        return res
    }
}