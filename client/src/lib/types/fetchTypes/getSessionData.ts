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
    numReview: number,
    numBooksRead: number,
    profilePicture: string,
    accessLevel: number,
    description: string,
    meanScore: number,
    daysRead: number,
    lookedAtBulletin: boolean,
    iat: number,
    exp: number,
    jti: string,
}