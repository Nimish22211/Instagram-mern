import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    userName: '',
    fullName: ''
}

const AuthUserSlice = createSlice({
    name: 'AuthUserSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.userName = action.payload.userName;
        }
    }
});

export const { setUser } = AuthUserSlice.actions

export const selectAuthUser = state => state.AuthUserSlice

export default AuthUserSlice.reducer