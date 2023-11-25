import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/pCategory/pCategorySilce";
import { getColors } from "../features/color/colorSlice";
import { deleteImg, uploadImg } from "../features/upLoad/uploadSlice";
import ReactQuill from "react-quill";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { newProduct, resetState } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";
let yup = require("yup");

const Addproduct = () => {
    const [color, setColor] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { brands } = useSelector((state) => state.brand);
    const { pCategories } = useSelector((state) => state.productCategory);
    const { colors } = useSelector((state) => state.color);
    const { images } = useSelector((state) => state.upload);
    const { isSuccess, isError, isLoading, createdProduct } = useSelector((state) => state.product);

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading]);

    let schema = yup.object().shape({
        title: yup.string().required("Title is Required"),
        description: yup.string().required("Description is Required"),
        price: yup.number().required("Price is Required"),
        brand: yup.string().required("Brand is Required"),
        category: yup.string().required("Category is Required"),
        tags: yup.string().required("Tags is Required"),
        color: yup.array().min(1, "Pick at least one color").required("Color is Required"),
        quantity: yup.number().required("Quantity are Required"),
    });

    const renderColors = () => {
        const getColors = [];
        colors.forEach((color) => {
            getColors.push({ value: color._id, label: color.title });
        });
        return getColors;
    };
    const handleColors = (p) => {
        setColor(p);
    };
    const newImages = () => {
        const getImages = [];
        images.forEach((image) => {
            getImages.push({ public_id: image.public_id, url: image.url });
        });
        return getImages;
    };
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getProductCategories());
        dispatch(getColors());
    }, []);
    useEffect(() => {
        formik.values.color = color ? color : " ";
        formik.values.images = newImages();
    }, [color, newImages()]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            tags: "",
            color: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(newProduct(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState())
                navigate("/admin/product-list");
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type={"text"}
                        label={"Enter Product Title"}
                        name={"title"}
                        val={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                    />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>
                    <div className="mt-3">
                        <ReactQuill
                            theme="snow"
                            name={"description"}
                            value={formik.values.description}
                            onChange={formik.handleChange("description")}
                        />
                    </div>
                    <div className="error">{formik.touched.description && formik.errors.description}</div>
                    <CustomInput
                        type={"number"}
                        label={"Enter Product Price"}
                        name={"price"}
                        val={formik.values.price}
                        onCh={formik.handleChange("price")}
                        onBl={formik.handleBlur("price")}
                    />
                    <div className="error">{formik.touched.price && formik.errors.price}</div>
                    <select
                        name={"brand"}
                        value={formik.values.brand}
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        className="form-control py-3 mt-3"
                        id=""
                    >
                        <option value={""} disabled>
                            Select Brand
                        </option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand.title} id="">
                                {brand.title}
                            </option>
                        ))}
                    </select>
                    <div className="error">{formik.touched.brand && formik.errors.brand}</div>
                    <select
                        name={"category"}
                        value={formik.values.category}
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        className="form-control py-3 mt-3"
                        id=""
                    >
                        <option value={""} disabled>
                            Select Category
                        </option>
                        {pCategories.map((pCategory, index) => (
                            <option key={index} value={pCategory.title} id="">
                                {pCategory.title}
                            </option>
                        ))}
                    </select>
                    <div className="error">{formik.touched.category && formik.errors.category}</div>
                    <select
                        name={"tags"}
                        value={formik.values.tags}
                        onChange={formik.handleChange("tags")}
                        onBlur={formik.handleBlur("tags")}
                        className="form-control py-3 mt-3"
                        id=""
                    >
                        <option value={""} disabled>
                            Select Tags
                        </option>
                        <option value={"featured"}>Featured</option>
                        <option value={"popular"}>Popular</option>
                        <option value={"special"}>Special</option>
                    </select>
                    <div className="error">{formik.touched.tags && formik.errors.tags}</div>
                    <Select
                        mode="multiple"
                        allowClear
                        className="w-100 mt-3"
                        placeholder="Select Colors"
                        defaultValue={color}
                        options={renderColors()}
                        onChange={(a) => handleColors(a)}
                    />
                    <div className="error">{formik.touched.color && formik.errors.color}</div>
                    <CustomInput
                        type={"number"}
                        label={"Enter Product Quantity"}
                        name={"quantity"}
                        val={formik.values.quantity}
                        onCh={formik.handleChange("quantity")}
                        onBl={formik.handleBlur("quantity")}
                    />
                    <div className="error">{formik.touched.quantity && formik.errors.quantity}</div>
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
                    <button type="submit" className="btn btn-primary my-3">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addproduct;
