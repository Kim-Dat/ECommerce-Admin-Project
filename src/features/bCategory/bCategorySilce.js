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

export const getBlogCategories = createAsyncThunk("blogCategory/get-blogCategories", async (thunkAPI) => {
    try {
        return await bCategoryService.getBlogCategories();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

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
            .addCase(getBlogCategories.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
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
            .addCase(createBlogCategory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(createBlogCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdBlogCategory = action.payload;
            })
            .addCase(resetState, () => initialState);
    },
});

export default bCategorySlice.reducer;
