import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";
const initialState = {
    brands: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getBrands = createAsyncThunk(
    "brand/get-brands",
    async (thunkAPI) => {
        try {
            return await brandService.getBrands();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createBrand = createAsyncThunk(
    "brand/create-brand",
    async (brandData, thunkAPI) => {
        try {
            return await brandService.postBrand(brandData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getBrand = createAsyncThunk(
    "brand/get-brand",
    async (id, thunkAPI) => {
        try {
            return await brandService.getBrand(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateBrand = createAsyncThunk(
    "brand/update-brand",
    async (brand, thunkAPI) => {
        try {
            return await brandService.putBrand(brand);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteBrand = createAsyncThunk(
    "brand/delete-brand",
    async (brand, thunkAPI) => {
        try {
            return await brandService.deleteBrand(brand);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset-all");

const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrands.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getBrands.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.brands = action.payload;
            })
            .addCase(createBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createBrand.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(createBrand.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdBrand = action.payload;
            })
            .addCase(getBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrand.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(getBrand.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.brandName = action.payload.title;
            })
            .addCase(updateBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateBrand.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(updateBrand.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedBrand = action.payload;
            })
            .addCase(deleteBrand.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteBrand.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "rejected";
            })
            .addCase(deleteBrand.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.deletedBrand = action.payload;
            })
            .addCase(resetState, () => initialState);
    },
});

export default brandSlice.reducer;
