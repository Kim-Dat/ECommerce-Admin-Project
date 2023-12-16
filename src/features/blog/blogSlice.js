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

export const createBlog = createAsyncThunk(
    "blog/create-blog",
    async (blog, thunkAPI) => {
        try {
            return await blogService.postBlog(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateBlog = createAsyncThunk(
    "blog/update-blog",
    async (blog, thunkAPI) => {
        try {
            return await blogService.putBlog(blog);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteBlog = createAsyncThunk(
    "blog/delete-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.deleteBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getBlog = createAsyncThunk(
    "blog/get-blog",
    async (id, thunkAPI) => {
        try {
            return await blogService.getBlog(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

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
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
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
            .addCase(createBlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdBlog = action.payload;
            })
            .addCase(updateBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlog.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedBlog = action.payload;
            })
            .addCase(deleteBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlog.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.deletedBlog = action.payload;
            })
            .addCase(getBlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlog.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getBlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.blogName = action.payload.title;
                state.blogDesc = action.payload.description;
                state.blogCate = action.payload.category;
                state.blogImages = action.payload.images;
            })
            .addCase(resetState, () => initialState);
    },
});

export default blogSlice.reducer;
