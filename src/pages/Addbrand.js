import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
    createBrand,
    resetState,
    getBrand,
    updateBrand,
} from "../features/brand/brandSlice";
let yup = require("yup");
const Addbrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const BrandId = location.pathname.split("/")[3];
    const {
        isSuccess,
        isError,
        isLoading,
        createdBrand,
        brandName,
        updatedBrand,
    } = useSelector((state) => state.brand);
    useEffect(() => {
        if (!!BrandId) {
            dispatch(getBrand(BrandId));
        } else {
            dispatch(resetState());
        }
    }, [BrandId]);
    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Brand Added Successfully");
        }
        if (isSuccess && updatedBrand) {
            toast.success("Brand Update Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading]);
    let schema = yup.object().shape({
        title: yup.string().required("Brand Name is Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(
                !!BrandId
                    ? updateBrand({ id: BrandId, brandData: values })
                    : createBrand(values)
            );
            dispatch(resetState());
            formik.resetForm();
            setTimeout(() => {
                navigate("/admin/brand-list");
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className="mb-5 title">{!!BrandId ? "Edit " : "Add "}Brand</h3>
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
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className="btn btn-primary my-3" type="submit">
                        {!!BrandId ? "Edit " : "Add "}Brand
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addbrand;
