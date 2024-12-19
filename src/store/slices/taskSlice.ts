import { createAsyncThunk, createSlice, UnknownAction } from "@reduxjs/toolkit";
import { ITask, ITaskFormData, ITasks } from "../../interfaces/store/taskSlice";
import { RootState } from "../store";
import { PREFIX } from "../../constants/constants";

interface ITaskSlice {
    task: ITask | null,
    tasks: ITasks | null,
    error: string | null,
    status: string | null
}

export const getTasksData = createAsyncThunk<ITasks, void, { rejectValue: string, state: RootState }>(
    'task/getTasksData',
    async (_, { rejectWithValue, getState }) => {
        const jwt = getState().user.jwt;

        const response = await fetch(`${PREFIX}/api/tasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as ITasks
        return data
    }
)

export const getTaskDataById = createAsyncThunk<ITask, string, { rejectValue: string, state: RootState }>(
    'task/getTasksDataById',
    async (id, { rejectWithValue, getState }) => {
        const jwt = getState().user.jwt;

        const response = await fetch(`${PREFIX}/api/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as ITask
        return data
    }
)

export const postTaskData = createAsyncThunk<ITask, ITaskFormData, { rejectValue: string, state: RootState }>(
    'task/postTaskData',
    async (taskDataClient, { rejectWithValue, getState }) => {
        const jwt = getState().user.jwt;
        const projectId = getState().project.project?.data.id

        taskDataClient = { ...taskDataClient, project: projectId, board: 1 }
        // console.log('taskDataClient', taskDataClient);

        const response = await fetch(`${PREFIX}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(
                {
                    data: { ...taskDataClient }
                }
            )
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as ITask
        return data
    }
)

const initialState: ITaskSlice = {
    task: null,
    tasks: null,
    error: null,
    status: null
}

const taskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(postTaskData.fulfilled, (state, action) => {
                // console.log('action', action.payload);
            })
            .addCase(getTasksData.fulfilled, (state, action) => {
                // console.log('action', action.payload);
                state.tasks = action.payload
            })
            .addMatcher(isRejected, (state, action) => {
                // console.log('action', action);
            })
    }
})

export const taskActions = taskSlice.actions
export default taskSlice.reducer

const isRejected = (action: UnknownAction) => {
    return action.type.endsWith('rejected')
}