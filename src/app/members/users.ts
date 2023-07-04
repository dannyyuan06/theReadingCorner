export type user = {
    username: string,
    name: string,
    dateJoined: string,
    lastOnline: string,
    email: string,
    booksRead: number
}

type users = user[]


export const membersUsers:users = [
    {
        username: "robdav",
        name: "Robyn Davies",
        dateJoined: "Apr 21, 2023",
        lastOnline: "3 hours ago",
        email: "robyndavis@email.com",
        booksRead: 4
    },
    {
        username: "danyua",
        name: "Danny Yuan",
        dateJoined: "Apr 22, 2023",
        lastOnline: "2 hours ago",
        email: "dannyyuan@email.com",
        booksRead: 0
    },
    {
        username: "alexvp",
        name: "Alexandar Van Poecke",
        dateJoined: "Apr 16, 2023",
        lastOnline: "3 days ago",
        email: "alexvp@email.com",
        booksRead: 30
    },
    {
        username: "camiltech",
        name: "Camillo Tellenbach",
        dateJoined: "Apr 19, 2023",
        lastOnline: "a day ago",
        email: "camillotellenback@email.com",
        booksRead: 123
    },
    {
        username: "maximillion",
        name: "Max Ellis",
        dateJoined: "Mar 1, 2023",
        lastOnline: "a few seconds ago",
        email: "maxellis@email.com",
        booksRead: 60
    }
]