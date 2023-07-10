import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState:string = "adminDashboard"

export const page = createSlice({
    name: "page",
    initialState,
    reducers: {
        changePage: (state, action:PayloadAction<string>) => {
            return action.payload
        } 
    }
})

export const {changePage} = page.actions

export default page.reducer