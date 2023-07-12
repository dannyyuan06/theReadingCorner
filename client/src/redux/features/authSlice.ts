import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type InitialStateType = {
    isAuthenticated: boolean
    username: string,
    profilePicture: string,
    uid: string,
    authority: number,
}

const initialState:InitialStateType = {
    isAuthenticated: false,
    username: "",
    profilePicture: "/images/profile_picture_placeholder.png",
    uid: "",
    authority: 0,
}

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction<string>) => {
            return {
                isAuthenticated: true,
                username: action.payload,
                profilePicture: initialState.profilePicture,
                uid: "somerandomstring",
                authority: 1
            }
        }
    }
})

export const {logIn, logOut} = auth.actions

export default auth.reducer