import { Book, UserBook } from "@prisma/client"

export interface userBookWithBook extends UserBook {
    book: Book
}