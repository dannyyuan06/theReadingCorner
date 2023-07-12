import { bookexample } from "../bookexample"

const exampleBooks = bookexample
const bookArr = Object.keys(exampleBooks)
let books:{[id: string]: string} = {}

for (let i=0;i<bookArr.length;i++) {
    const key = bookArr[i]
    const value = exampleBooks[key]
    
    books[key] = value.volumeInfo.title
}

export const booksWithTitles = books

export const allBooks = exampleBooks
