import { BookType } from "@/app/bookexample";
import { Book } from "@prisma/client";

export interface CurrentlyReadingType extends BookType {
    affiliateLink: string
}

export interface CurrentlyReadingInput {
    bookid: string,
    averageRating: number,
    pageNumber: number,
    affiliateLink: string,
    status: number,
}

export interface CurrentlyReadingUpdate {
    readid: number,
    pageNumber: ""|number,
    status: number,
    affiliateLink: string,
}

export interface CurrentlyReadingUpdatePrisma {
    readid: number,
    pageNumber: number,
    status: number,
    affiliateLink: string,
}