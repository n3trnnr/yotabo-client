import { RootState } from "../store";
import { createAsyncThunk, createSlice, UnknownAction } from "@reduxjs/toolkit";
import { IColumn, IColumnResponse, IColumnsResponse } from "../../interfaces/store/boardSlice";
import { PREFIX } from "../../constants/constants";
import { TId } from "../../interfaces/global";

interface IBoardSlice {
    columns: IColumn[],
    status: string | null,
    error: string | null
}

export const getBoardData = createAsyncThunk<IColumnsResponse, TId, { rejectValue: string, state: RootState }>(
    'board/getBoardsData',
    async (projectId, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt

        dispatch(boardActions.resetStatus());
        //filters[project][documentId]=${projectId}
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

export const editColumn = createAsyncThunk<IColumnResponse, { field: string, value: string, id: TId }, { rejectValue: string, state: RootState }>(
    'board/editColumn',
    async (updatedData, { rejectWithValue, getState, dispatch }) => {

        const jwt = getState().user.jwt;

        dispatch(boardActions.resetStatus());

        const response = await fetch(`${PREFIX}/api/columns/${updatedData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                data: {
                    [updatedData.field]: updatedData.value
                }
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as IColumnResponse
        return data
    }
)

export const deleteColumn = createAsyncThunk<TId, TId, { rejectValue: string, state: RootState }>(
    'projects/deleteProject',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;

        dispatch(boardActions.resetStatus())

        const response = await fetch(`${PREFIX}/api/columns/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        return id
    }
)

const initialState: IBoardSlice = {
    columns: [],
    status: null,
    error: null
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.error = null;
            state.status = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getBoardData.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'Succes';

                state.columns = action.payload.data
            })

            .addCase(editColumn.fulfilled, (state, action) => {
                const index = state.columns.findIndex((column) => {
                    column.documentId === action.payload.data.documentId
                })

                if (index !== -1) {
                    state.columns[index] = action.payload.data
                }
            })

            .addCase(deleteColumn.fulfilled, (state, action) => {
                state.error = null
                state.status = 'Success'

                if (state.columns) {
                    state.columns = state.columns.filter((column) => {
                        return column.documentId !== action.payload
                    })
                }
            })

            .addMatcher(isRejected, (state, action: any) => {
                const payloadMessage = action.payload as unknown as string
                const errorMessage = action.error.message as unknown as string
                state.error = payloadMessage ?? errorMessage
            })
    }
})

export const boardActions = boardSlice.actions
export default boardSlice.reducer

const isRejected = (action: UnknownAction) => {
    return action.type.endsWith('rejected')
}