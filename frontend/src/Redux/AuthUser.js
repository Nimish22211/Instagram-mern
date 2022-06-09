import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email: '',
    userName: '',
    fullName: '',
    followers: [],
    following: [],
    posts: [],
    bio: ''
}

const AuthUserSlice = createSlice({
    name: 'AuthUserSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.userName = action.payload.userName;
            state.followers = action.payload.followers;
            state.following = action.payload.following;
            state.posts = action.payload.posts;
            state.bio = action.payload.bio;
        }
    }
});

export const { setUser } = AuthUserSlice.actions

export const selectAuthUser = state => state.AuthUserSlice

export default AuthUserSlice.reducer