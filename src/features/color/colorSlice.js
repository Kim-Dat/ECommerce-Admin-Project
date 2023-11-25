import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";
const initialState = {
    colors: [],
    createdColor: "",
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

export const getColors = createAsyncThunk(
    "color/get-colors",
    async (thunkAPI) => {
        try {
            return await colorService.getColors();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createColor = createAsyncThunk(
    "color/create-color",
    async (color, thunkAPI) => {
        try {
            return await colorService.postColor(color);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateColor = createAsyncThunk(
    "color/update-color",
    async (color, thunkAPI) => {
        console.log(color)
        try {
            return await colorService.putColor(color);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const deleteColor = createAsyncThunk(
    "color/delete-color",
    async (id, thunkAPI) => {
        try {
            return await colorService.deleteColor(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const getColor = createAsyncThunk(
    "color/get-color",
    async (id, thunkAPI) => {
        try {
            return await colorService.getColor(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset-all");

const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getColors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColors.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.colors = action.payload;
            })
            .addCase(createColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createColor.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.createdColor = action.payload;
            })
            .addCase(updateColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateColor.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.updatedColor = action.payload;
            })
            .addCase(deleteColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.deletedColor = action.payload;
            })
            .addCase(getColor.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getColor.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getColor.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.colorName = action.payload.title;
            })
            .addCase(resetState, () => initialState);
    },
});

export default colorSlice.reducer;
