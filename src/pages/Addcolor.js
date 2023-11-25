import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import {
    createColor,
    getColor,
    resetState,
    updateColor
} from "../features/color/colorSlice";
let yup = require("yup");

const Addcolor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const ColorId = location.pathname.split("/")[3];
    const {
        isSuccess,
        isError,
        isLoading,
        createdColor,
        updatedColor,
        colorName,
    } = useSelector((state) => state.color);

    useEffect(() => {
        if (!!ColorId) {
            dispatch(getColor(ColorId));
        } else {
            dispatch(resetState());
        }
    }, [ColorId]);

    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success("Color Added Successfully");
        }
        if (isSuccess && updatedColor) {
            toast.success("Color Added Successfully");
        }
        if (isError) {
            toast.error("something went wrong !!!");
        }
    }, [isSuccess, isError, isLoading]);
    let schema = yup.object().shape({
        title: yup.string().required("Color Name is Required"),
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: colorName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(
                !!ColorId
                    ? updateColor({ id: ColorId, colorData: values })
                    : createColor(values)
            );
            dispatch(resetState());
            setTimeout(() => {
                navigate("/admin/color-list");
            }, 1000);
        },
    });
    return (
        <div>
            <h3 className="mb-5 title">{!!ColorId ? "Edit " : "Add "}Color</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type={"color"}
                        label={"Enter Color"}
                        name={"title"}
                        val={formik.values.title}
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button className="btn btn-primary my-3" type="submit">
                        {!!ColorId ? "Edit " : "Add "}Color
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addcolor;
