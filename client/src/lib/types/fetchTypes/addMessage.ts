import { Book } from "@prisma/client";
import { GetSessionDataType } from "./getSessionData";

export interface AddMessageMessageType {
    body: string,
    username: string
    books: book[]
}

interface book {
    book: Book
}

export interface AddMessageType {
    message: AddMessageMessageType,
    user: GetSessionDataType,
    dateCreated: Date,

}