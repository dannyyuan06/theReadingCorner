import { AddMessageMessageType } from "@/lib/types/fetchTypes/addMessage";
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
    static async getMessages(num: number) {
        const rest:getMessagesType[] = await prisma.bulletinBoardMessages.findMany({
            take: num,
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
 
    static async addMessage(message: AddMessageMessageType) {
        const res = await prisma.bulletinBoardMessages.create({
            data: {
                body: message.body,
                username: message.username,
            }
        })
        const bookObject = message.books.map((book) => ({
            bookid: book.book.bookid,
            messageid: res.messageid
        }))
        await prisma.bulletinBoardBooks.createMany({
            data: bookObject,
            skipDuplicates: true
        })
        return res
    }
}