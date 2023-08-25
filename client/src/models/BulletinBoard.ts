import { AddMessageMessageType } from "@/lib/types/fetchTypes/addMessage";
import { prisma } from "@/prisma/db";
import { Book, BulletinBoardBooks, BulletinBoardMessages, Users } from "@prisma/client";
import { ProfileFriendType } from "./User";

interface booksRelationshipType extends BulletinBoardBooks {
    book: Book
}

export interface getMessagesType extends BulletinBoardMessages {
    user: ProfileFriendType,
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
                user: {
                    select: {
                        username: true,
                        firstName: true,
                        lastName: true,
                        lastOnline: true,
                        numBulletinPosts: true,
                        numBooksRead: true,
                        profilePicture: true,
                    }
                }
            }
        })
        prisma.$disconnect()
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
        prisma.$disconnect()
        return res
    }

    static async reportMessage(messageid: number) {
        try {
            const message = await prisma.bulletinBoardMessages.update({
                where: {messageid},
                data: {reported: true}
            })
            prisma.$disconnect()
            return [message, ""]
        } catch(err) {
            return [null, err]
        }
    }

    static async unreportMessage(messageid: number) {
        try {
            const message = await prisma.bulletinBoardMessages.update({
                where: {messageid},
                data: {reported: false}
            })
            prisma.$disconnect()
            return [message, ""]
        } catch(err) {
            return [null, err]
        }
    }

    static async deleteMessage(messageid: number) {
        try {
            const message = await prisma.bulletinBoardMessages.delete({
                where: {messageid}
            })
            prisma.$disconnect()
            return [message, ""]
        } catch(err) {
            return [null, `${err}`]
        }
    }

    static async getReportedMessages(): Promise<[getMessagesType[]| null, string]> {
        try {
            const messages:getMessagesType[] = await prisma.bulletinBoardMessages.findMany({
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
            prisma.$disconnect()
            return [messages, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }
}