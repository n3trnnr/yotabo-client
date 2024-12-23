import { createSlice, createAsyncThunk, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { getState } from "../localStorage/localStorage";
import { PREFIX, TOKEN_PRESISTENT_STATE_NAME, USER_PRESISTENT_STATE_NAME } from "../../constants/constants";
import { IUser, IUserResponse, IUserFormData } from "../../interfaces/store/userSlice";

interface IUserSlice {
    currentUser: IUser | null
    jwt: null | string,
    loadingStatus: boolean,
    error: null | string,
}

const initialState: IUserSlice = {
    currentUser: getState(USER_PRESISTENT_STATE_NAME) ?? null,
    jwt: getState(TOKEN_PRESISTENT_STATE_NAME) ?? null,
    loadingStatus: false,
    error: null,
}

export const registerUser = createAsyncThunk<IUserResponse, IUserFormData, { rejectValue: string }>(
    'user/registerUser',
    async (newUser, { rejectWithValue }) => {
        const response = await fetch(`${PREFIX}/api/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as IUserResponse

        return data
    }
)

export const loginUser = createAsyncThunk<IUserResponse, IUserFormData, { rejectValue: string }>(
    'user/loginUser',
    async (loginUser, { rejectWithValue }) => {
        const response = await fetch(`${PREFIX}/api/auth/local?populate=*`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(loginUser),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return rejectWithValue(`${response.status.toString()} - ${response.statusText} - ${errorData?.error?.message}`)
        }

        const data = await response.json() as IUserResponse

        return data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.jwt = null
            state.currentUser = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                registerUser.fulfilled, (state, action) => {
                    console.log('action', action.payload);

                    state.currentUser = action.payload.user
                    state.jwt = action.payload.jwt
                    // state.loadingStatus = true
                }
            )

            .addCase(
                loginUser.fulfilled, (state, action) => {
                    // console.log('action', action.payload);
                    state.currentUser = action.payload.user
                    state.jwt = action.payload.jwt
                    // state.loadingStatus = true
                }
            )

            .addMatcher(isRejected, (state, action: PayloadAction<string>) => {
                // console.log('payload - ', action.payload);
                // state.error = action.payload
                // state.loadingStatus = false
            })
            .addMatcher(isPending, (state) => {
                // state.loadingStatus = true;
            })
    }
})

const isRejected = (action: UnknownAction) => {
    return action.type.endsWith('rejected')
}

const isPending = (action: UnknownAction) => {
    return action.type.endsWith('pending')
}

export default userSlice.reducer
export const userActions = userSlice.actions