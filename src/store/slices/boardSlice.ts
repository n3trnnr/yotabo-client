import { RootState } from "../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IColumnsResponse } from "../../interfaces/store/boardSlice";
import { PREFIX } from "../../constants/constants";
import { TId } from "../../interfaces/global";

interface IBoardSlice {
    columns: IColumnsResponse[] | null,
    status: string | null,
    error: string | null
}

export const getBoardData = createAsyncThunk<IColumnsResponse, TId, { rejectValue: string, state: RootState }>(
    'board/getBoardsData',
    async (projectId, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt

        const response = await fetch(`${PREFIX}/api/columns?id=${projectId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as IColumnsResponse
        return data
    }

)

const initialState: IBoardSlice = {
    columns: null,
    status: null,
    error: null
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getBoardData.fulfilled, (state, action) => {
                console.log(action.payload);

            })
    }
})

export const boardActions = boardSlice.actions
export default boardSlice.reducer