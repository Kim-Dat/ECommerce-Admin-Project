import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { deleteImg, uploadImg } from "../features/upLoad/uploadSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogCategories } from "../features/bCategory/bCategorySilce";
import { createBlog, resetState } from "../features/blog/blogSlice";
let yup = require("yup");
const Addblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { images } = useSelector((state) => state.upload);
    const { bCategories } = useSelector((state) => state.blogCategory);
    const { isSuccess, isError, isLoading, createdBlog } = useSelector((state) => state.blog);
    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading]);
    let schema = yup.object().shape({
        title: yup.string().required("Title is Required"),
        category: yup.string().required("Category is Required"),
        description: yup.string().required("Description is Required"),
    });
    const newImages = () => {
        const getImages = [];
        images.forEach((image) => {
            getImages.push({ public_id: image.public_id, url: image.url });
        });
        return getImages;
    };
    useEffect(() => {
        dispatch(getBlogCategories());
    }, []);
    useEffect(() => {
        formik.values.images = newImages();
    }, [newImages()]);
    const formik = useFormik({
        initialValues: {
            images: "",
            title: "",
            category: "",
            description: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlog(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
                navigate("/admin/blog-list");
            }, 1000);
        },
    });

    return (
        <div>
            <h3 className="mb-5 title">Add Blog</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mt-3">
                        <CustomInput
                            type={"text"}
                            label={"Enter Blog Title"}
                            name={"title"}
                            val={formik.values.title}
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                        />
                        <div className="error">{formik.touched.title && formik.errors.title}</div>
                    </div>
                    <select
                        name={"category"}
                        value={formik.values.category}
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        className="form-control py-3 mt-3"
                        id=""
                    >
                        <option value={""} id="">
                            Select Blog Category
                        </option>
                        {bCategories.map((blogCategory, index) => (
                            <option key={index} value={blogCategory.title} id="">
                                {blogCategory.title}
                            </option>
                        ))}
                    </select>
                    <div className="error">{formik.touched.category && formik.errors.category}</div>
                    <div className="mt-3">
                        <ReactQuill
                            theme="snow"
                            className="mt-3"
                            name="description"
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                         <div className="error">{formik.touched.description && formik.errors.description}</div>
                    </div>
                    <div className="bg-white border-1 p-5 text-center my-3">
                        <Dropzone onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="show-images d-flex flex-wrap gap-3">
                        {images.map((image, index) => (
                            <div key={index} className="position-relative">
                                <button
                                    type="button"
                                    className="btn-close position-absolute"
                                    style={{ top: "4px", right: "4px" }}
                                    onClick={() => {
                                        dispatch(deleteImg(image.public_id));
                                    }}
                                ></button>
                                <img src={image.url} width={120} height={120} alt="uploadImg" />
                            </div>
                        ))}
                    </div>
                    <button className="btn btn-primary my-3" type="submit">
                        Add Blog
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addblog;
