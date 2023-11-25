import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
const initialState = {
    products: [],
    createdProduct: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getProducts = createAsyncThunk("product/get-products", async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const newProduct = createAsyncThunk("product/create-product", async (productData, thunkAPI) => {
    try {
        return await productService.postProduct(productData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const resetState = createAction("Reset_all");
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(newProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(newProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(newProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default productSlice.reducer;
