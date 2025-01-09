import { RootState } from "../store";
import { createAsyncThunk, createSlice, UnknownAction } from "@reduxjs/toolkit";
import { IColumn, IColumnResponse, IColumnsResponse, ITask } from "../../interfaces/store/boardSlice";
import { PREFIX } from "../../constants/constants";
import { TId } from "../../interfaces/global";
import { TModalWindowFormData } from "../../components/ModalWindow/TModalWindow";

interface IBoardSlice {
    columns: IColumn[],
    status: string | null,
    error: string | null
}

export const getColumnsData = createAsyncThunk<IColumnsResponse, TId, { rejectValue: string, state: RootState }>(
    'board/getColumnsData',
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

export const postColumnData = createAsyncThunk<IColumnResponse, TModalWindowFormData, { rejectValue: string, state: RootState }>(
    'board/postColumnData',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;
        const projectId = getState().projects.project?.documentId;
        const order = getState().board.columns.length === 0 ? 0 : getState().board.columns.length

        dispatch(boardActions.resetStatus());

        if (!formData.title.length) {
            formData.title = 'Untitled'
        }

        const response = await fetch(`${PREFIX}/api/columns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                data: {
                    ...formData, project: projectId, order
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
    'board/deleteColumn',
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

export const postTaskData = createAsyncThunk<ITask, TModalWindowFormData, { rejectValue: string, state: RootState }>(
    'board/postTaskData',
    async (formData, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;
        const order = getState().board.columns.length === 0 ? 0 : getState().board.columns.length

        dispatch(boardActions.resetStatus());

        const response = await fetch(`${PREFIX}/api/columns`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
                data: {
                    ...formData, column: '', order
                }
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as ITask
        return data
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
            .addCase(getColumnsData.fulfilled, (state, action) => {
                state.error = null;
                state.status = 'Succes';

                state.columns = action.payload.data
                console.log('state.columns', state.columns);

            })

            .addCase(postColumnData.fulfilled, (state, action) => {
                if (action.payload) {
                    state.columns.push(action.payload.data)
                }
            })

            .addCase(editColumn.fulfilled, (state, action) => {
                state.error = null
                state.status = 'Success'

                // const index = state.columns.findIndex((column) => {
                //     column.documentId === action.payload.data.documentId
                // })

                // if (index !== -1) {
                //     state.columns[index] = action.payload.data
                // }

                state.columns = state.columns.map((column) => {
                    if (column.documentId === action.payload.data.documentId) {
                        return column = action.payload.data
                    }
                    return column
                })
            })

            .addCase(deleteColumn.fulfilled, (state, action) => {
                state.error = null
                state.status = 'Success'

                state.columns = state.columns.filter((column) => {
                    return column.documentId !== action.payload
                })
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