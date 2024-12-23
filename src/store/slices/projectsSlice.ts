import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { PREFIX } from "../../constants/constants";
import { RootState } from "../store";
import { IProjectFormData, IProjectResponse, IProjectsResponse } from "../../interfaces/store/projectSlice";
import { TId } from "../../interfaces/global";
import { hex } from "../../helpers/hex";

interface IProjectsSlice {
    project: IProjectResponse | null,
    projects: IProjectsResponse | null,
    filteredProjects: IProjectsResponse | null,
    error: string | null,
    status: string | null
}

export const getProjectsData = createAsyncThunk<IProjectsResponse, void, { rejectValue: string, state: RootState }>(
    'projects/getProjectsData',
    async (_, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt

        dispatch(projectsActions.clearStatus())

        const response = await fetch(`${PREFIX}/api/projects`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as IProjectsResponse
        return data
    }
)

export const getProjectDataById = createAsyncThunk<IProjectResponse, TId, { rejectValue: string, state: RootState }>(
    'projects/getProjectDataById',
    async (id, { rejectWithValue, getState }) => {
        const jwt = getState().user.jwt
        const response = await fetch(`${PREFIX}/api/projects/${id}?populate=*`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as IProjectResponse
        return data
    }
)

export const postProjectData = createAsyncThunk<IProjectResponse, IProjectFormData, { rejectValue: string, state: RootState }>(
    'projects/postProjectData',
    async (projectDataClient, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;

        dispatch(projectsActions.clearStatus())

        const response = await fetch(`${PREFIX}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(
                {
                    data: { ...projectDataClient, hex: hex() }
                }
            )
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as IProjectResponse
        return data
    }
)

export const deleteProject = createAsyncThunk<IProjectResponse, TId, { rejectValue: string, state: RootState }>(
    'projects/deleteProject',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;

        dispatch(projectsActions.clearStatus())

        const response = await fetch(`${PREFIX}/api/projects/${id}`, {
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

        const data = await response.json() as IProjectResponse
        return data
    }
)

export const editProject = createAsyncThunk<IProjectResponse, { field: string, value: string | boolean, projectId: TId }, { rejectValue: string, state: RootState }>(
    'projects/editProject',
    async (updatedData, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;

        dispatch(projectsActions.clearStatus())

        const response = await fetch(`${PREFIX}/api/projects/${updatedData.projectId}`, {
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

        const data = await response.json() as IProjectResponse
        return data
    }
)

const initialState: IProjectsSlice = {
    project: null,
    projects: null,
    filteredProjects: null,
    error: null,
    status: null
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        clearStatus: (state) => {
            state.status = null
            state.error = null
        },
        sortItemsBySubstring: (state, action: PayloadAction<string>) => {
            if (state.projects && action.payload) {
                state.filteredProjects = state.projects

                if (action.payload.length > 0) {
                    console.log(action.payload, 'ok');
                    const substring = action.payload.toLocaleLowerCase();

                    state.projects.data = [...state.projects.data].sort((a, b) => {
                        const indexA = a.attributes.title.toLocaleLowerCase().indexOf(substring)
                        const indexB = b.attributes.title.toLocaleLowerCase().indexOf(substring)
                        if (indexA === -1 && indexB === -1) return 0;
                        if (indexA === -1) return 1;
                        if (indexB === -1) return -1;
                        return indexA - indexB;
                    })
                } else {
                    console.log('clear  ', action.payload);
                    state.projects.data = state.filteredProjects.data
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjectsData.fulfilled, (state, action) => {
                state.projects = action.payload
            })

            .addCase(getProjectDataById.fulfilled, (state, action) => {
                state.project = action.payload
            })

            .addCase(postProjectData.fulfilled, (state, action) => {
                state.error = null
                state.status = 'Success'

                if (state.projects) {
                    state.projects.data.push(action.payload.data)
                }
            })

            .addCase(deleteProject.fulfilled, (state, action) => {
                state.error = null
                state.status = 'Success'

                if (state.projects) {
                    state.projects.data = state.projects.data.filter((project) => {
                        return project.id !== action.payload.data.id
                    })
                }
            })

            .addCase(editProject.fulfilled, (state, action) => {
                state.error = null
                state.status = 'Success'

                const updatedProject = action.payload

                if (state.projects) {
                    const index = state.projects.data.findIndex((project) => {
                        return project.id === updatedProject.data.id
                    })

                    if (index !== -1) {
                        state.projects.data[index] = updatedProject.data
                    }
                }
            })

            .addMatcher(isRejected, (state, action: any) => {
                // console.log('action', action);

                const payloadMessage = action.payload as unknown as string
                const errorMessage = action.error.message as unknown as string
                state.error = payloadMessage ?? errorMessage
            })
    },

})

export const projectsActions = projectsSlice.actions
export default projectsSlice.reducer

const isRejected = (action: UnknownAction) => {
    return action.type.endsWith('rejected')
}