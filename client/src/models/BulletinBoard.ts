import { AddMessageMessageType } from "@/lib/types/fetchTypes/addMessage";
import prisma from "@/prisma/db";
import { Book, BulletinBoardBooks, BulletinBoardMessages } from "@prisma/client";
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
                        profilePicture: true,
                        joinDate: true,
                        accessLevel: true,
                    }
                }
            }
        })
        
        return rest
    }
 
    static async addMessage(message: AddMessageMessageType):Promise<[BulletinBoardMessages|null, string]> {
        try {
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
            
            return [res, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async reportMessage(messageid: number) {
        try {
            const message = await prisma.bulletinBoardMessages.update({
                where: {messageid},
                data: {reported: true}
            })
            
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
            
            return [message, ""]
        } catch(err) {
            return [null, err]
        }
    }

    static async deleteMessage(messageid: number, username: string, accessLevel: number) {
        try {
            if (accessLevel !== 3) {
                const message = await prisma.bulletinBoardMessages.findUnique({where: {messageid}})
                if (message?.username !== username) {
                    ;
                    return [null, "User is not authorised"]
                }
            }
            const message = await prisma.bulletinBoardMessages.delete({
                where: {messageid}
            })
            
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
            
            return [messages, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }
}