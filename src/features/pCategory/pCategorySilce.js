import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import pCategoryService from "./pCategoryService";
const initialState = {
    pCategories: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getProductCategories = createAsyncThunk(
    "productCategory/get-productCategories",
    async (thunkAPI) => {
        try {
            return await pCategoryService.getProductCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getProductCategory = createAsyncThunk(
    "productCategory/get-productCategory",
    async (id, thunkAPI) => {
        try {
            return await pCategoryService.getProductCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createCategory = createAsyncThunk(
    "productCategory/create-productCategory",
    async (cate, thunkAPI) => {
        try {
            return await pCategoryService.postProductCategories(cate);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateCategory = createAsyncThunk(
    "productCategory/update-productCategory",
    async (cate, thunkAPI) => {
        try {
            return await pCategoryService.putProductCategory(cate);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteCategory = createAsyncThunk(
    "productCategory/delete-productCategory",
    async (cate, thunkAPI) => {
        try {
            return await pCategoryService.deleteProductCategory(cate);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset-all");

const pCategorySlice = createSlice({
    name: "productCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategories.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getProductCategories.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.pCategories = action.payload;
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdCategory = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedProductCategory = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.deletedProductCategory = action.payload;
            })
            .addCase(getProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getProductCategory.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.productCategoryName = action.payload.title;
            })
            .addCase(resetState, () => initialState);
    },
});

export default pCategorySlice.reducer;
