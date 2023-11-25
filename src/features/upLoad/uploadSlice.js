import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialState = {
    images: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
};

export const uploadImg = createAsyncThunk("upload/images", async (data, thunkAPI) => {
    try {
        const formData = new FormData();
        for (let i = 0; i < data.length; ++i) {
            formData.append("images", data[i]);
        }
        return await uploadService.uploadImg(formData);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});
export const deleteImg = createAsyncThunk("delete/images", async (id, thunkAPI) => {
    try {
        return await uploadService.deleteImg(id);
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});

const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.images = action.payload;
            })
            .addCase(deleteImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteImg.fulfilled, (state, action) => {
                state.isError = false;
                state.isSuccess = true;
                state.isLoading = false;
                state.images = [];
            });
    },
});

export default uploadSlice.reducer;
