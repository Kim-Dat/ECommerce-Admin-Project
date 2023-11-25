import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";
const initialState = {
    blogs: [],
    createdBlog: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createBlog = createAsyncThunk("blog/create-blog", async (blogData, thunkAPI) => {
    try {
        return await blogService.postBlog(blogData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset-all");

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.blogs = action.payload;
            })
            .addCase(createBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlog.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdBlog = action.payload;
            })
            .addCase(resetState, () => initialState);
    },
});

export default blogSlice.reducer;
