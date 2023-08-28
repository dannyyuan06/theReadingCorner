import { prisma } from "@/prisma/db";
import { booksType } from "./Book";
import * as bcrypt from 'bcrypt'
import { userBookWithBook } from "./UserBook";
import { Book, UserBook, Users as UserPrismaType, Users } from "@prisma/client";
import { AddUserbookBookType, UpdateUserbookBookType } from "@/lib/types/fetchTypes/addUserbook";
import { userModelType } from "@/app/register/credentials/Form";

// Initiallisation

export const userInit = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    lastOnline: new Date(),
    joinDate: new Date(),
    profilePicture: "",
    accessLevel: -2,
    description: "",
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

export type ProfileFriendType = {
    username: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    lastOnline: Date,
    joinDate: Date,
}

export interface userWithFriendid extends ProfileFriendType {
    friendid: [string, string]
}

export interface getProfileInfoReturnType extends UserPrismaType {
    booksRead: userBookWithBook[],
    friends: userWithFriendid[],
    requestPendingFriends: userWithFriendid[],
    incomingRequestFriends: userWithFriendid[],
    numBooksRead: number,
    numBulletinPosts: number
}

export interface UpdateUser {
    accessLevel: number
}


export default class User {
    username:          string;
    email:             string;
    firstName:         string;
    lastName:          string;
    lastOnline:        Date  ;
    joinDate:          Date;
    profilePicture:    string;
    accessLevel:       number;
    description:       string;
    lookedAtBulletin:  boolean;
    constructor(data: userType) {
        this.username = data.username
        this.email = data.email
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.lastOnline = data.lastOnline 
        this.joinDate = data.joinDate
        this.profilePicture = data.profilePicture 
        this.accessLevel = data.accessLevel 
        this.description = data.description
        this.lookedAtBulletin = data.lookedAtBulletin  
    }

    static async usernameMake(username: string): Promise<[userType|null, string]> {
        try {
            const user = await prisma.users.findUnique({
                where: {username}
            })
            if (!user) return [null, `User not found`]
            prisma.$disconnect()
            return [new User(user), ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async emailMake(email: string): Promise<[userType|null, string]> {
        try {
            const user = await prisma.users.findFirst({
                where: {email: email}
            })
            await prisma.users.update({
                where: {username: user?.username},
                data: {lastOnline: new Date()}
            })
            prisma.$disconnect()
            if (!user) return [null, `User not found`]
            return [new User(user), ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async addUserInDatabse(form: userModelType) {
        try {
            const user = await prisma.users.create({
                data: {
                    username: form.username,
                    email: form.email,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    accessLevel: 1,
                    description: form.description,
                    lastOnline: new Date(),
                    profilePicture: "/images/profile_picture_placeholder.png",
                    lookedAtBulletin: false,
                }
            })
            await prisma.userPasswords.create({
                data: {
                    username: form.username,
                    password: form.password ? await bcrypt.hash(form.password, 10) : "",
                }
            })
            prisma.$disconnect()
            return [true, `Created ${form.username} in the database!`, user]
        } catch(err) {
            console.error("Unable to create user in database")
            return [false, `Error. Unable to create user in database. Error code: ${err}`, null]
        }
    }

    static async getUsers(name?: string): Promise<[Users[]|null, string]> {
        try {
            if (name) {
                const users = await prisma.users.findMany({
                    take: 15,
                    where: {
                        username: {
                            contains: name
                        }
                    }
                })
                return [users, ""]
            }
            const users = await prisma.users.findMany({
                take: 15
            })
            prisma.$disconnect()
            return [users, ""]
        } catch (error) {
            return [null, `${error}`]
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
                        },
                        orderBy: [
                            {
                                status: 'asc'
                            },
                            {
                                dateStarted: 'desc'
                            },
                        ],
                        take: 10,
                    },
                    friend1: {
                        include: {
                            friend2: {
                                select: {
                                    username: true,
                                    firstName: true,
                                    lastName: true,
                                    lastOnline: true,
                                    profilePicture: true,
                                    joinDate: true,
                                }
                            }
                        }
                    },
                    friend2: {
                        include: {
                            friend1: {
                                select: {
                                    username: true,
                                    firstName: true,
                                    lastName: true,
                                    lastOnline: true,
                                    profilePicture: true,
                                    joinDate: true,
                                }
                            }
                        }
                    },
                }
            })
            if (!user) return [null, "User does not exist"]

            const firstFriends:userWithFriendid[] = user.friend1.reduce((prev:userWithFriendid[], friend) => friend.status === 3 ? [...prev, {...friend.friend2, friendid: [friend.friend1id, friend.friend2id]}]: prev, [])
            const secondFriends:userWithFriendid[] = user.friend2.reduce((prev:userWithFriendid[], friend) => friend.status === 3 ? [...prev, {...friend.friend1, friendid: [friend.friend1id, friend.friend2id]}]: prev, [])
            const friends:userWithFriendid[] = [...firstFriends, ...secondFriends].sort()

            const requestPendingFirstFriends:userWithFriendid[] = user.friend1.reduce((prev:userWithFriendid[], friend) => friend.status === 1 ? [...prev, {...friend.friend2, friendid: [friend.friend1id, friend.friend2id]}]: prev, [])
            const requestPendingSecondFriends:userWithFriendid[] = user.friend2.reduce((prev:userWithFriendid[], friend) => friend.status === 2 ? [...prev, {...friend.friend1, friendid: [friend.friend1id, friend.friend2id]}]: prev, [])
            const requestPendingFriends:userWithFriendid[] = [...requestPendingFirstFriends, ...requestPendingSecondFriends].sort()

            const incomingFirstFriendRequests:userWithFriendid[] = user.friend1.reduce((prev:userWithFriendid[], friend) => friend.status === 2 ? [...prev, {...friend.friend2, friendid: [friend.friend1id, friend.friend2id]}]: prev, [])
            const incomingSecondFriendRequests:userWithFriendid[] = user.friend2.reduce((prev:userWithFriendid[], friend) => friend.status === 1 ? [...prev, {...friend.friend1, friendid: [friend.friend1id, friend.friend2id]}]: prev, [])
            const incomingRequestFriends:userWithFriendid[] = [...incomingFirstFriendRequests, ...incomingSecondFriendRequests].sort()
            
            const {friend1, friend2, ...usefulUserInfo} = user!

            const numBulletinPostsPromise = prisma.bulletinBoardMessages.count({
                where: { username: user.username}
            })

            const numBooksReadPromise = prisma.userBook.count({
                where: {username: user.username}
            })

            const settlePromise = await Promise.all([numBulletinPostsPromise, numBooksReadPromise])

            const [numBulletinPosts, numBooksRead] = settlePromise

            const usefulInfo = {
                ...usefulUserInfo,
                numBulletinPosts,
                numBooksRead,
                friends,
                requestPendingFriends,
                incomingRequestFriends
            }
            prisma.$disconnect()
            return [usefulInfo, ""]
            
        } catch(err) {
            return [null, `${err}`]
        }
    }

    static async updateProfile(username:string, firstName:string, lastName:string, email:string, description:string) {
        try {
            const res = await prisma.users.update({
                where: {username},
                data: {
                    firstName,
                    lastName,
                    email,
                    description
                }
            })
            return [res, ""]
        } catch (err) {
            return [null, err]
        }

    }


    static async validatePassword(username: string, passwordStr: string):Promise<[boolean, userType|null]> {
        try {
            const userPass = await prisma.userPasswords.findUnique({
                where: {
                    username
                }
            })
            const t:boolean = await bcrypt.compare(passwordStr, userPass!.password)
            if (t) {
                const user = await prisma.users.findUnique({where: {username}})
                return [true, user]
            }
            prisma.$disconnect()
            return [false, null]
        } catch (error) {
            return [false, null]
        }
    }

    static async addReadBook(userbook: AddUserbookBookType) {
        try {
            const userBook = await prisma.userBook.create({
                data: userbook
            })
            prisma.$disconnect()
            return [userBook, ""]
        } catch (err) {
            return [null, err]
        }
    }

    static async hasReadBook(username: string, bookid: string): Promise<[UserBook|null, string]> {
        try {
            const userbook = await prisma.userBook.findFirst({
                where: {
                    username: username,
                    bookid: bookid
                }
            })
            prisma.$disconnect()
            return [userbook, ""]
        } catch(err) {
            return [null, `${err}`]
        }
    }

    static async updateReadBook(username: string, bookid: string, data: UpdateUserbookBookType) {
        try {
            const userBook = await prisma.userBook.update({
                where: {bookid_username: {
                    bookid,
                    username
                }},
                data
            })
            prisma.$disconnect()
            return [userBook, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async deleteUserBook(username: string, bookid: string) {
        try {
            const userBook = await prisma.userBook.delete({
                where: {bookid_username: {
                    bookid,
                    username
                }}
            })
            return [userBook, ""]
        } catch (err) {
            return [null, `${err}`]
        } finally {
            prisma.$disconnect()
        }
    }

    static async uploadAvatar(username: string, profilePicture: string) {
        try {
            const user = await prisma.users.update({
                where: {username},
                data: {profilePicture}
            })
            prisma.$disconnect()
            return [user, ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async resetPassword(username: string, newPassword: string) {
        try {
            const user = await prisma.userPasswords.update({
                where: {username},
                data: {password: await bcrypt.hash(newPassword, 10)}
            })
            prisma.$disconnect()
            return [user, ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async update(username: string, data:UpdateUser ) {
        try {
            const user = await prisma.users.update({
                where: {username},
                data: data
            })
            prisma.$disconnect()
            return [user, ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async disableAccount(username: string) {
        try {
            const user = await prisma.users.update({
                where: {username},
                data: {accessLevel: -1}
            })
            prisma.$disconnect()
            return [user, ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async enableAccount(username: string) {
        try {
            const user = await prisma.users.update({
                where: {username},
                data: {accessLevel: 1}
            })
            prisma.$disconnect()
            return [user, ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async deleteAccount(username: string) {
        try {
            const user = await prisma.users.delete({
                where: {username}
            })
            prisma.$disconnect()
            return [user, ""]
        } catch (error) {
            return [null, `${error}`]
        }
    }

    static async searchUsers(username: string) {
        try {
            const users = await prisma.users.findMany({
                where: {
                    username: {
                        contains: username,
                        mode: 'insensitive'
                    }
                }
            })
            prisma.$disconnect()
            return [users, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async friendRequest(username: string, friendUsername: string) {
        if (username === friendUsername) return [null, `Cannot request self`]
        try {
            const friend1Exists = await prisma.friends.findUnique({
                where: {
                    friend1id_friend2id: {
                        friend1id: username,
                        friend2id: friendUsername
                    }
                }
            })

            const friend2Exists = await prisma.friends.findUnique({
                where: {
                    friend1id_friend2id: {
                        friend2id: username,
                        friend1id: friendUsername
                    }
                }
            })

            if (friend1Exists || friend2Exists) return [null, "Already exists in database"]
            const friendRelationship = await prisma.friends.create({
                data: {
                    friend1id: username,
                    friend2id: friendUsername,
                    dateStarted: new Date(),
                    status: 1
                }
            })
            prisma.$disconnect()
            return [friendRelationship, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async acceptFriendRequest(friendid:[string, string], username: string) {
        try {
            const friendRelationship = await prisma.friends.findUnique({
                where: {
                    friend1id_friend2id: {
                        friend1id: friendid[0],
                        friend2id: friendid[1]
                    }
                }})
            if (!friendRelationship) return [null, "Friendship not found"]
            if (friendRelationship.status === 1 && friendRelationship.friend2id === username || 
                friendRelationship.status === 2 && friendRelationship.friend1id === username
                ) {
                const returnFriendship = await prisma.friends.update({
                    where: {
                        friend1id_friend2id: {
                            friend1id: friendid[0],
                            friend2id: friendid[1]
                        }
                    },
                    data: {
                        status: 3
                    }
                })
                prisma.$disconnect()
                return [returnFriendship, '']
            }
            return [null, 'Not authorised']
        } catch (err) {
            return [null, `${err}`]
        }
    }


    static async hasLookedAtBulletinBoard(username: string): Promise<[{lookedAtBulletin: boolean}|null, string]> {
        try {
            const res = await prisma.users.update({
                where: {username},
                data: {
                    lookedAtBulletin: true
                },
                select: {
                    lookedAtBulletin: true
                }
            })
            return [res, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }
}