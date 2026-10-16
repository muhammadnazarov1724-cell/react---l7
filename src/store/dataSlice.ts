import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { initialstate } from "../components/types";
import axios from "axios";
import { api } from "../utils/api";

// CRUD

// GET
export let getUsers = createAsyncThunk('data/getUsers', async()=> {
    try {
        let {data} = await axios.get(api)
        return data
    } catch (error) {
        console.log(error);
    }
})

// DELETE
export let deleteUser = createAsyncThunk('data/deleteUser', async(id, {dispatch}) => {
    try {
        await axios.delete(`${api}/${id}`)
        dispatch(getUsers())
    } catch (error) {
        console.log(error);
    }
})

// POST
export let postUser = createAsyncThunk('data/postUser', async(user, {dispatch}) => {
    try {
        await axios.post(api,user)
        dispatch(getUsers())
    } catch (error) {
        console.log(error);
    }
})

// PUT
export let putUser = createAsyncThunk('data/putUser', async(user: any, {dispatch}) => {
    try {
        await axios.put(`${api}/${user.id}`, user)
        dispatch(getUsers())
    } catch (error) {
        console.log(error);
    }
})


let initialState: initialstate = {
    data: [],
    loading: false,
    error: []
}

export let dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload
        })
        .addCase(getUsers.rejected, (state,action) => {
            state.loading = false,
            state.error = action.payload
        })
    }
})

export default dataSlice.reducer