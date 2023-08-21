-- CreateTable
CREATE TABLE "UserPasswords" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "UserPasswords_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Users" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "lastOnline" TIMESTAMP(3) NOT NULL,
    "joinDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numBulletinPosts" INTEGER NOT NULL,
    "numReview" INTEGER NOT NULL,
    "numBooksRead" INTEGER NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "accessLevel" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "meanScore" DOUBLE PRECISION NOT NULL,
    "daysRead" DOUBLE PRECISION NOT NULL,
    "lookedAtBulletin" BOOLEAN NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Book" (
    "bookid" TEXT NOT NULL,
    "bookPicture" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pageCount" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookid")
);

-- CreateTable
CREATE TABLE "UserBook" (
    "userbookid" SERIAL NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFinished" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "page" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "bookid" TEXT NOT NULL,

    CONSTRAINT "UserBook_pkey" PRIMARY KEY ("userbookid")
);

-- CreateTable
CREATE TABLE "Friends" (
    "friend1id" TEXT NOT NULL,
    "friend2id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Friends_pkey" PRIMARY KEY ("friend1id","friend2id")
);

-- CreateTable
CREATE TABLE "BulletinBoardMessages" (
    "messageid" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "reported" BOOLEAN NOT NULL DEFAULT false,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,

    CONSTRAINT "BulletinBoardMessages_pkey" PRIMARY KEY ("messageid")
);

-- CreateTable
CREATE TABLE "BulletinBoardBooks" (
    "bulletinboardbookid" SERIAL NOT NULL,
    "bookid" TEXT NOT NULL,
    "messageid" INTEGER NOT NULL,

    CONSTRAINT "BulletinBoardBooks_pkey" PRIMARY KEY ("bulletinboardbookid")
);

-- CreateTable
CREATE TABLE "Meetings" (
    "meetingid" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateOfMeeting" TIMESTAMP(3) NOT NULL,
    "link" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "host" TEXT NOT NULL,

    CONSTRAINT "Meetings_pkey" PRIMARY KEY ("meetingid")
);

-- CreateTable
CREATE TABLE "CurrentlyReading" (
    "readid" SERIAL NOT NULL,
    "bookid" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pageNumber" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "CurrentlyReading_pkey" PRIMARY KEY ("readid")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "statid" SERIAL NOT NULL,
    "currentlyReadingBook" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "numOfMembers" INTEGER NOT NULL,
    "numOfBooksRead" INTEGER NOT NULL,
    "bulletinEngagement" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("statid")
);

-- CreateTable
CREATE TABLE "BookSuggestions" (
    "booksuggestionid" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "bookid" TEXT NOT NULL,

    CONSTRAINT "BookSuggestions_pkey" PRIMARY KEY ("booksuggestionid")
);

-- CreateTable
CREATE TABLE "GenreSuggestion" (
    "genresuggestionid" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "GenreSuggestion_pkey" PRIMARY KEY ("genresuggestionid")
);

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBook" ADD CONSTRAINT "UserBook_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friend1id_fkey" FOREIGN KEY ("friend1id") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friends" ADD CONSTRAINT "Friends_friend2id_fkey" FOREIGN KEY ("friend2id") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulletinBoardMessages" ADD CONSTRAINT "BulletinBoardMessages_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulletinBoardBooks" ADD CONSTRAINT "BulletinBoardBooks_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulletinBoardBooks" ADD CONSTRAINT "BulletinBoardBooks_messageid_fkey" FOREIGN KEY ("messageid") REFERENCES "BulletinBoardMessages"("messageid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CurrentlyReading" ADD CONSTRAINT "CurrentlyReading_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookSuggestions" ADD CONSTRAINT "BookSuggestions_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookSuggestions" ADD CONSTRAINT "BookSuggestions_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "Book"("bookid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenreSuggestion" ADD CONSTRAINT "GenreSuggestion_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
