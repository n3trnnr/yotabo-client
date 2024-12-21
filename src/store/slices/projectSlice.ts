import { createAsyncThunk, createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { PREFIX } from "../../constants/constants";
import { RootState } from "../../store/store";
import { IProject, IProjectFormData, IProjects } from "../../interfaces/store/projectSlice";
import { TId } from "../../interfaces/global";
import { hex } from "../../helpers/hex";
// import { ErrorPayload } from "vite/types/hmrPayload.js";

interface IProjectSlice {
    project: IProject | null,
    projects: IProjects | null,
    filteredProjects: IProjects | null,
    error: string | null,
    status: string | null
}

export const getProjectsData = createAsyncThunk<IProjects, void, { rejectValue: string, state: RootState }>(
    'project/getProjectsData',
    async (_, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt

        dispatch(projectActions.clearStatus())

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

        const data = await response.json() as IProjects
        return data
    }
)

export const getProjectDataById = createAsyncThunk<IProject, TId, { rejectValue: string, state: RootState }>(
    'project/getProjectDataById',
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

        const data = await response.json() as IProject
        return data
    }
)

export const postProjectData = createAsyncThunk<IProject, IProjectFormData, { rejectValue: string, state: RootState }>(
    'project/postProjectData',
    async (projectDataClient, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;

        dispatch(projectActions.clearStatus())

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

        const data = await response.json() as IProject
        return data
    }
)

export const deleteProject = createAsyncThunk<IProject, TId, { rejectValue: string, state: RootState }>(
    'project/deleteProject',
    async (id, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;

        dispatch(projectActions.clearStatus())

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

        const data = await response.json() as IProject
        return data
    }
)

export const editProject = createAsyncThunk<IProject, { field: string, value: string, projectId: TId }, { rejectValue: string, state: RootState }>(
    'project/editProject',
    async (updatedData, { rejectWithValue, getState, dispatch }) => {
        const jwt = getState().user.jwt;

        dispatch(projectActions.clearStatus())

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

        const data = await response.json() as IProject
        return data
    }
)

export

    const initialState: IProjectSlice = {
        project: null,
        projects: null,
        filteredProjects: null,
        error: null,
        status: null
    }

const projectSlice = createSlice({
    name: 'project',
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
                // console.log('action', action.payload);
                state.projects = action.payload
            })

            .addCase(getProjectDataById.fulfilled, (state, action) => {
                // console.log('getProjectDataById - ', action.payload.data);
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

export const projectActions = projectSlice.actions
export default projectSlice.reducer

const isRejected = (action: UnknownAction) => {
    return action.type.endsWith('rejected')
}