import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const initialState = {
    user: getUserfromLocalStorage,
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};
export const login = createAsyncThunk("auth/admin-login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAllOrders = createAsyncThunk("order/get-all-orders", async (thunkAPI) => {
    try {
        return await authService.getAllOrders();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = "rejected";
            })
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.user = null;
                state.message = action.error;
            });
    },
});

export default authSlice.reducer;
