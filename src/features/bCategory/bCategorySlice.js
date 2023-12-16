import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryService";
const initialState = {
    bCategories: [],
    createdBlogCategory: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getBlogCategories = createAsyncThunk(
    "blogCategory/get-blogCategories",
    async (thunkAPI) => {
        try {
            return await bCategoryService.getBlogCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createBlogCategory = createAsyncThunk(
    "blogCategory/create-blogCategory",
    async (blogCategoryData, thunkAPI) => {
        try {
            return await bCategoryService.postBlogCategory(blogCategoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateBlogCategory = createAsyncThunk(
    "blogCategory/update-blogCategory",
    async (blogCate, thunkAPI) => {
        try {
            return await bCategoryService.putBlogCategory(blogCate);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteBlogCategory = createAsyncThunk(
    "blogCategory/delete-blogCategory",
    async (id, thunkAPI) => {
        try {
            return await bCategoryService.deleteBlogCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getBlogCategory = createAsyncThunk(
    "blogCategory/get-blogCategory",
    async (id, thunkAPI) => {
        try {
            return await bCategoryService.getBlogCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset-all");

const bCategorySlice = createSlice({
    name: "blogCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getBlogCategories.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.bCategories = action.payload;
            })
            .addCase(createBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdBlogCategory = action.payload;
            })
            .addCase(updateBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateBlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedBlogCategory = action.payload;
            })
            .addCase(deleteBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteBlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.deletedBlogCategory = action.payload;
            })
            .addCase(getBlogCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getBlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.blogCateName = action.payload.title;
            })
            .addCase(resetState, () => initialState);
    },
});

export default bCategorySlice.reducer;
