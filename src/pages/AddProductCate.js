import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
    createCategory,
    getProductCategory,
    resetState,
    updateCategory,
} from "../features/pCategory/pCategorySlice";
let yup = require("yup");
const AddProductCate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const ProductCategoryId = location.pathname.split("/")[3];

    const {
        isSuccess,
        isError,
        isLoading,
        createdCategory,
        productCategoryName,
        updatedProductCategory,
    } = useSelector((state) => state.productCategory);

    useEffect(() => {
        if (!!ProductCategoryId) {
            dispatch(getProductCategory(ProductCategoryId));
        } else {
            dispatch(resetState());
        }
    }, [ProductCategoryId]);

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success("Category Added Successfully");
        }
        if (isSuccess && updatedProductCategory) {
            toast.success("Category Added Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading]);

    let schema = yup.object().shape({
        title: yup.string().required("Category Name is Required"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productCategoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(
                !!ProductCategoryId
                    ? updateCategory({
                          id: ProductCategoryId,
                          cateData: values,
                      })
                    : createCategory(values)
            );
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/category-list");
            }, 1000);
        },
    });

    return (
        <div>
            <h3 className="mb-5 title">
                {!!ProductCategoryId ? "Edit " : "Add "}Category
            </h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type={"text"}
                        label={"Enter Category"}
                        name={"title"}
                        val={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className="btn btn-primary my-3" type="submit">
                        {!!ProductCategoryId ? "Edit " : "Add "}Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductCate;
