import prisma from "@/prisma/db";
import { Book } from "@prisma/client";
import { headers } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";

interface bookWithUser extends Book {
  usersRead: {
    score: number;
  }[];
}

// Update averages of books
async function updateBooks() {
  // Get books
  const books = await prisma.book.findMany({
    include: {
      usersRead: {
        select: {
          score: true,
        },
      },
    },
  });

  // Update books function
  const updateBook = (bookid: string, average: number) => {
    const bookPromise = prisma.book.update({
      where: { bookid },
      data: {
        averageRating: isNaN(average) ? -1 : average,
      },
      select: { bookid: true },
    });
    return bookPromise;
  };
  
  // Get average function
  const getAverages = (book: bookWithUser) => {
    const userTotalScores = book.usersRead.reduce(
      (prev, curr) => prev + curr.score,
      0
    );
    const average = userTotalScores / book.usersRead.length;
    // This will return a promise
    return updateBook(book.bookid, average);
  };

  // Create an array of book promises
  const averagePromises = books.map((book) => getAverages(book));
  // Run the promises in parallel
  const settledAverages = Promise.all(averagePromises);

  // This will also return a promise
  return settledAverages;
}

// Calculate the engagement of the Bulletin Board
async function engagement() {
  // Get all users which have looked at the bulletin
  const users = await prisma.users.findMany({
    select: {
      lookedAtBulletin: true,
    },
  });
  // Reducer function to find total
  const totalLookedAtBulletin = users.reduce(
    (prev, curr) => prev + Number(curr.lookedAtBulletin),
    0
  );
  // Calculate engagement
  const engagement = totalLookedAtBulletin / users.length;

  // This is a promise which updates the users
  const engagementPromise = prisma.statistics.update({
    where: { statid: 1 },
    data: {
      bulletinEngagement: isNaN(engagement) ? 0 : engagement,
    },
    select: { statid: true },
  });
  // Return the promise
  return engagementPromise;
}

// Update statistics
export async function PUT(req: NextRequest) {
  const headerlist = headers();
  // Make sure this is the Google Scheduler with an authentication token
  const auth = headerlist.get("Authorization");
  if (auth !== process.env.GOOGLE_SCHEDULER_SECRET)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    // Get updating statistics promises
    const updateBookPromise = updateBooks();
    const engagementPromise = engagement();
    // Run the promises all in parallel
    await Promise.all([updateBookPromise, engagementPromise]);
    return NextResponse.json(
      { success: "Success" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `${err}` },
      {
        status: 500,
      }
    );
  }
}

// Changes all users looked at bulletin to false each month
export async function PATCH(req: NextRequest) {
  const headerlist = headers();
  const auth = headerlist.get("Authorization");
  if (auth !== process.env.GOOGLE_SCHEDULER_SECRET)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    // Change all of the users to false
    await prisma.users.updateMany({
      where: {},
      data: {
        lookedAtBulletin: false,
      },
    });
    return NextResponse.json(
      { success: "Success" },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `${err}` },
      {
        status: 500,
      }
    );
  }
}
