

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
        name: "Random Person",
        email: "randomperson1@nevergonnagive.you.up",
        address: "why is this here?",
        profilePicture: "/rick",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        authority: 1,
    }
}