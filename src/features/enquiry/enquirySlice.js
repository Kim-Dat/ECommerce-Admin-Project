import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";

const initialState = {
    enquiries: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: "",
};

export const getEnquiries = createAsyncThunk("enquiry/get-enquiries", async (thunkAPI) => {
    try {
        return await enquiryService.getEnquiries();
    } catch (error) {
        thunkAPI.rejectWithValue(error);
    }
});

const enquirySlice = createSlice({
     name: "enquiries",
     initialState,
     reducers: {},
     extraReducers: (builder) => {
         builder
             .addCase(getEnquiries.pending, (state) => {
                 state.isLoading = true;
             })
             .addCase(getEnquiries.rejected, (state, action) => {
                 state.isLoading = false;
                 state.isError = true;
                 state.isSuccess = false;
                 state.message = action.error;
             })
             .addCase(getEnquiries.fulfilled, (state, action) => {
                 state.isError = false;
                 state.isSuccess = true;
                 state.isLoading = false;
                 state.enquiries = action.payload;
             });
     },
});

export default enquirySlice.reducer;
