import Book from "@/models/Book";
import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: { search: string } }
) {
  // Authentication
  const [access, errRes] = await apiMiddleware(req, 0);
  if (!access) return errRes;

  // Get search
  const bookName = params.search;
  if (!Book.checkBookName(bookName))
    return NextResponse.json(
      { body: "Book must be between 1 and 100 characters long" },
      { status: 400 }
    );
  // Call the Google books API
  const books = await Book.queryBooks(bookName);
  return NextResponse.json(books);
}
