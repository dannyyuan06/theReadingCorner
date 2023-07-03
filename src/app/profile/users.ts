

type userType = {
    [id: string]: {
        name: string,
        email: string,
        address: string,
        profilePicture: string,
        summary: string,
        authority: number
    }
}

export const users: userType = {
    "1230": {
        name: "Rick Astley",
        email: "rickastley@nevergonnagive.you.up",
        address: "why is this here?",
        profilePicture: "/rick",
        summary: "I will never give you up or let you down. I will always gonna go around",
        authority: 1,
    }
}