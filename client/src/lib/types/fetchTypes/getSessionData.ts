import User from "@/models/User";

export interface GetSessionDataType {
    user: {
        email: string
    },
    expires: string,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    lastOnline: Date,
    joinDate: Date,
    numBulletinPosts: number,
    numBooksRead: number,
    profilePicture: string,
    accessLevel: number,
    description: string,
    lookedAtBulletin: boolean,
    iat: number,
    exp: number,
    jti: string,
}