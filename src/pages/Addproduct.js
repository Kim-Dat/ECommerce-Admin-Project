import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/pCategory/pCategorySlice";
import { getColors } from "../features/color/colorSlice";
import { deleteImg, uploadImg } from "../features/upLoad/uploadSlice";
import ReactQuill from "react-quill";
import CustomInput from "../components/CustomInput";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { createProduct, getProduct, updateProduct, resetState } from "../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
let yup = require("yup");

const AddProduct = () => {
    const [color, setColor] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const ProductId = location.pathname.split("/")[3];
    const { brands } = useSelector((state) => state.brand);
    const { pCategories } = useSelector((state) => state.productCategory);
    const { colors } = useSelector((state) => state.color);
    const images = useSelector((state) => state.upload.images) || [];
    const { isSuccess, isError, isLoading, createdProduct, productName, productBrand, productPrice, productDesc, productCate, productQuantity, productTags, productColor, productImages, updatedProduct } = useSelector((state) => state.product);
    useEffect(() => {
        if (!!ProductId) {
            dispatch(getProduct(ProductId));
            img.push(productImages);
        } else {
            dispatch(resetState());
        }
    }, [ProductId]);

    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully");
        }
        if (isSuccess && updatedProduct) {
            toast.success("Product Update Successfully");
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

    const img = [];
    images.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        if (images.length > 0) {
            const newImage = images[images.length - 1];
            formik.setFieldValue("images", [{ public_id: newImage.public_id, url: newImage.url }]);
        }
    }, [images]);

    const renderColors = () => {
        const getColors = [];
        colors.forEach((color) => {
            getColors.push({ value: color._id, label: <div style={{ width: "20px", height: "20px", backgroundColor: color.title, borderRadius: "50%" }}></div> });
        });
        return getColors;
    };
    const handleColors = (p) => {
        setColor(p);
    };
    useEffect(() => {
        dispatch(resetState());
        dispatch(getBrands());
        dispatch(getProductCategories());
        dispatch(getColors());
    }, []);
    useEffect(() => {
        formik.setFieldValue("color", color);
    }, [color]);
    const colorEditValue = productColor?.map((item) => item._id);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: productName || "",
            description: productDesc || "",
            price: productPrice || "",
            brand: productBrand || "",
            category: productCate || "",
            tags: productTags || "",
            color: colorEditValue || "",
            quantity: productQuantity || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const currentColors = formik.values.color;
            const updatedColors = [...currentColors, ...color];
            const newValues = { ...values, color: [...new Set(updatedColors)] };
            alert(JSON.stringify(newValues));
            dispatch(!!ProductId ? updateProduct({ id: ProductId, productData: newValues }) : createProduct(values));
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState());
                navigate("/admin/product-list");
            }, 1000);
        },
    });

    const handleDeleteImage = (public_id) => {
        dispatch(deleteImg(public_id));
    };
    return (
        <div>
            <h3 className="mb-4 title"> {!!ProductId ? "Edit " : "Add "}Product</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type={"text"} label={"Enter Product Title"} name={"title"} val={formik.values.title} onCh={formik.handleChange("title")} onBl={formik.handleBlur("title")} />
                    <div className="error">{formik.touched.title && formik.errors.title}</div>
                    <div className="mt-3">
                        <ReactQuill theme="snow" name={"description"} value={formik.values.description} onChange={formik.handleChange("description")} />
                    </div>
                    <div className="error">{formik.touched.description && formik.errors.description}</div>
                    <CustomInput type={"number"} label={"Enter Product Price"} name={"price"} val={formik.values.price} onCh={formik.handleChange("price")} onBl={formik.handleBlur("price")} />
                    <div className="error">{formik.touched.price && formik.errors.price}</div>
                    <select name={"brand"} value={formik.values.brand} onChange={formik.handleChange("brand")} onBlur={formik.handleBlur("brand")} className="form-control py-3 mt-3" id="">
                        <option value={""} disabled>
                            Select Brand
                        </option>
                        {brands?.map((brand, index) => (
                            <option key={index} value={brand.title} id="">
                                {brand.title}
                            </option>
                        ))}
                    </select>
                    <div className="error">{formik.touched.brand && formik.errors.brand}</div>
                    <select name={"category"} value={formik.values.category} onChange={formik.handleChange("category")} onBlur={formik.handleBlur("category")} className="form-control py-3 mt-3" id="">
                        <option value={""} disabled>
                            Select Category
                        </option>
                        {pCategories?.map((pCategory, index) => (
                            <option key={index} value={pCategory.title} id="">
                                {pCategory.title}
                            </option>
                        ))}
                    </select>
                    <div className="error">{formik.touched.category && formik.errors.category}</div>
                    <select name={"tags"} value={formik.values.tags} onChange={formik.handleChange("tags")} onBlur={formik.handleBlur("tags")} className="form-control py-3 mt-3" id="">
                        <option value={""} disabled>
                            Select Tags
                        </option>
                        <option value={"featured"}>Featured</option>
                        <option value={"popular"}>Popular</option>
                        <option value={"special"}>Special</option>
                    </select>
                    <div className="error">{formik.touched.tags && formik.errors.tags}</div>
                    <Select mode="multiple" allowClear className="w-100 mt-3 fs-6" placeholder="Select Colors" defaultValue={color} options={renderColors()} onChange={(a) => handleColors(a)} />
                    <div className="error">{formik.touched.color && formik.errors.color}</div>
                    <CustomInput type={"number"} label={"Enter Product Quantity"} name={"quantity"} val={formik.values.quantity} onCh={formik.handleChange("quantity")} onBl={formik.handleBlur("quantity")} />
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
                        {images?.map((image, index) => (
                            <div key={index} className="position-relative">
                                <button
                                    type="button"
                                    className="btn-close position-absolute"
                                    style={{ top: "4px", right: "4px" }}
                                    onClick={() => {
                                        handleDeleteImage(image.public_id);
                                    }}
                                ></button>
                                <img src={image.url} width={120} height={120} alt="uploadImg" />
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="btn btn-primary my-3">
                        {!!ProductId ? "Edit " : "Add "}Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
