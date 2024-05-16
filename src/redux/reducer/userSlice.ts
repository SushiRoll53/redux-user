import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: number;
    name: string;
}

interface UsersState {
    entities: User[];
    loading: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | undefined;
}

const initialState: UsersState = {
    entities: [],
    loading: 'idle',
    error: undefined,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async () => {
    const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        {
            name: "Bryan",
            email: "bryan@elpasolabs.com",
            id: 11
        });
    return response.data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch user
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.entities = action.payload;
                state.loading = 'idle';
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = 'idle';
            });

        // Create User
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = 'loading';
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.entities = [action.payload];
                state.loading = 'idle';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = 'idle';
            });
    },
});

export default usersSlice.reducer;
