import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { createBlogCategory, resetState } from "../features/bCategory/bCategorySilce";
let yup = require("yup");

const Addblogcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccess, isError, isLoading, createdBlogCategory } = useSelector((state) => state.blogCategory);
    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success("BlogCategory Added Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading, createdBlogCategory]);
    let schema = yup.object().shape({
        title: yup.string().required("BlogCategory Name is Required"),
    });
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlogCategory(values));
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/blog-category-list");
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className="mb-5 title">Add Blog Category</h3>
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
                        Add Blog Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addblogcat;
