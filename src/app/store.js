import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import productCategoryReducer from "../features/pCategory/pCategorySilce";
import colorReducer from "../features/color/colorSlice";
import blogReducer from "../features/blog/blogSlice";
import blogCategoryReducer from "../features/bCategory/bCategorySilce";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upLoad/uploadSlice";
import couponReducer from "../features/coupon/CouponSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        productCategory: productCategoryReducer,
        color: colorReducer,
        blog: blogReducer,
        blogCategory: blogCategoryReducer,
        enquiry: enquiryReducer,
        upload: uploadReducer,
        coupon: couponReducer,
    },
});
