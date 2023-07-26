import { prisma } from "@/prisma/db";
import { booksType } from "./Book";
import * as bcrypt from 'bcrypt'
import { userBookWithBook } from "./UserBook";
import { Book, UserBook, Users as UserPrismaType } from "@prisma/client";

// Initiallisation

export const userInit = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    lastOnline: new Date(),
    joinDate: new Date(),
    numBulletinPosts: -1,
    numReview: -1,
    numBooksRead: -1,
    profilePicture: "",
    accessLevel: -1,
    description: "",
    meanScore: -1,
    daysRead: -1,
    lookedAtBulletin: false,
}

export type userType = typeof userInit

export const clientUser = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    accessLevel: -1,
    description: "",
    password: "",
    profilePicture: "/images/profile_picture_placeholder.png"
}

export type clientUserType = typeof clientUser

interface getProfileInfoReturnType extends UserPrismaType {
    booksRead: userBookWithBook[],
    friends: userType[]
}

export default class User {
    username:          string;
    email:             string;
    firstName:         string;
    lastName:          string;
    lastOnline:        Date  ;
    joinDate:          Date;
    numBulletinPosts:  number;
    numReview:         number;
    numBooksRead:      number;
    profilePicture:    string;
    accessLevel:       number;
    description:       string;
    meanScore:         number;
    daysRead:          number;
    lookedAtBulletin:  boolean;
    constructor(data: userType) {
        this.username = data.username
        this.email = data.email
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.lastOnline = data.lastOnline 
        this.joinDate = data.joinDate 
        this.numBulletinPosts = data.numBulletinPosts  
        this.numReview = data.numReview 
        this.numBooksRead = data.numBooksRead 
        this.profilePicture = data.profilePicture 
        this.accessLevel = data.accessLevel 
        this.description = data.description 
        this.meanScore = data.meanScore 
        this.daysRead = data.daysRead 
        this.lookedAtBulletin = data.lookedAtBulletin  
    }

    static async usernameMake(username: string): Promise<[userType|null, string]> {
        try {
            const user = await prisma.users.findUnique({
                where: {username}
            })
            const {password, ...otherUser} = user!
            return [new User(otherUser), ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async emailMake(email: string): Promise<[userType|null, string]> {
        try {
            const user = await prisma.users.findFirst({
                where: {email: email}
            })
            console.log("email Make")
            await prisma.users.update({
                where: {username: user?.username},
                data: {lastOnline: new Date()}
            })
            const {password, ...otherUser} = user!
            return [new User(otherUser), ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async addUserInDatabse(form: clientUserType) {
        try {
            const user = await prisma.users.create({
                data: {
                    username: form.username,
                    email: form.email,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    accessLevel: form.accessLevel,
                    description: form.description,
                    password: form.password ? await bcrypt.hash(form.password, 10) : "",
                    lastOnline: new Date(),
                    numBulletinPosts: 0,
                    numReview: 0,
                    numBooksRead: 0,
                    profilePicture: form.profilePicture ? form.profilePicture : "/images/profile_picture_placeholder.png",
                    meanScore: 0,
                    daysRead: 0,
                    lookedAtBulletin: false,
                }
            })
            return [true, `Created ${form.username} in the database!`, user]
        } catch(err) {
            console.error("Unable to create user in database")
            return [false, `Error. Unable to create user in database. Error code: ${err}`, null]
        }
    }

    

    static async getProfileInfo(username: string): Promise<[getProfileInfoReturnType|null, string]> {
        try {  
            const user = await prisma.users.findUnique({
                where: {username},
                include: {
                    booksRead: {
                        include: {
                            book: true,
                        }
                    },
                    friend1: {
                        include: {
                            friend2: true
                        }
                    },
                    friend2: {
                        include: {
                            friend1: true
                        }
                    },
                }
            })
            const friends = [...user!.friend1.map(friend => friend.friend2), ...user!.friend2.map(friend => friend.friend1)].sort()
            const {friend1, friend2, ...usefulUserInfo} = user!
            const usefulInfo = {
                ...usefulUserInfo,
                friends: friends,
            }
            return [usefulInfo, ""]
            
        } catch(err) {
            return [null, `${err}`]
        }
    }


    static async validatePassword(username: string, passwordStr: string):Promise<[boolean, userType|null]> {
        try {
            const user = await prisma.users.findUnique({
                where: {
                    username
                }
            })
            const t:boolean = await bcrypt.compare(passwordStr, user!.password)
            if (t) {
                const { password , ...usefulInfo} = user!
                return [true, usefulInfo]
            }
            return [false, null]
        } catch (error) {
            console.log(error)
            return [false, null]
        }
    }

    static async addReadBook(userbook: UserBook) {
        try {
            const userBook = await prisma.userBook.create({
                data: userbook
            })
            return [userBook, ""]
        } catch (err) {
            return [null, err]
        }
    }

    static async hasReadBook(username: string, bookid: string) {
        try {
            const userbook = await prisma.userBook.findFirst({
                where: {
                    username: username,
                    bookid: bookid
                }
            })
            return [userbook, ""]
        } catch(err) {
            return [null, err]
        }
    }

    static async updateReadBook(userbook: UserBook) {
        try {
            const userBook = await prisma.userBook.update({
                where: {userbookid: userbook.userbookid},
                data: {
                    score: userbook.score,
                    status: userbook.status,
                    page: userbook.page,
                    dateFinished: userbook.status === 2 ? new Date() : new Date(0)
                }
            })
            return [userBook, ""]
        } catch (err) {
            return [null, err]
        }
    }
}