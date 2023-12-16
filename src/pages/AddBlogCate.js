import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    resetState,
} from "../features/bCategory/bCategorySlice";
let yup = require("yup");

const AddBlogCate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const BlogCateId = location.pathname.split("/")[3];
    const {
        isSuccess,
        isError,
        isLoading,
        createdBlogCategory,
        updatedBlogCategory,
        blogCateName,
    } = useSelector((state) => state.blogCategory);
    useEffect(() => {
        if (!!BlogCateId) {
            dispatch(getBlogCategory(BlogCateId));
        } else {
            dispatch(resetState());
        }
    }, [BlogCateId]);

    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success("BlogCategory Added Successfully");
        }
        if (isSuccess && updatedBlogCategory) {
            toast.success("BlogCategory Update Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading]);
    let schema = yup.object().shape({
        title: yup.string().required("BlogCategory Name is Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogCateName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(
                !!BlogCateId
                    ? updateBlogCategory({
                          id: BlogCateId,
                          blogCateData: values,
                      })
                    : createBlogCategory(values)
            );
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/blog-category-list");
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className="mb-5 title">
                {!!BlogCateId ? "Edit " : "Add "}Blog Category
            </h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type={"text"}
                        label={"Enter Brand"}
                        name={"title"}
                        val={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                    />
                    <button className="btn btn-primary my-3" type="submit">
                        {!!BlogCateId ? "Edit " : "Add "}Blog Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogCate;
