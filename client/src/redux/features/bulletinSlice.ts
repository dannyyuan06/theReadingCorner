import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState:boolean = false;

export const lookedBulletin = createSlice({
    name: "bulletin",
    initialState,
    reducers: {
        changeBulletin: (state, action:PayloadAction<boolean>) => {
            return action.payload
        } 
    }
})

export const {changeBulletin} = lookedBulletin.actions

export default lookedBulletin.reducer