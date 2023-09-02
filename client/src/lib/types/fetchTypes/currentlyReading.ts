import { BookType } from "@/app/bookexample";
import { Book } from "@prisma/client";

export interface CurrentlyReadingType extends BookType {
    affiliateLink: string
}

export interface CurrentlyReadingInput {
    bookid: string,
    pageNumber: number,
    affiliateLink: string,
    status: number,
}

export interface CurrentlyReadingUpdate {
    pageNumber: ""|number,
    status: number,
    affiliateLink: string,
}

export interface CurrentlyReadingUpdatePrisma {
    pageNumber: number,
    status: number,
    affiliateLink: string,
}