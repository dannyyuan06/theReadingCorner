import { Users } from "@prisma/client"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    lastOnline: new Date(0),
    joinDate: new Date(0),
    profilePicture: "/images/profile_picture_placeholder.png",
    accessLevel: -2,
    description: "",
    lookedAtBulletin: false,
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction<Users>) => {
            return action.payload
        }
    }
})

export const {logIn, logOut} = auth.actions
export const userInitialState = initialState

export default auth.reducer