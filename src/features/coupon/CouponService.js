import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getCoupons = async () => {
    const res = await axios.get(`${base_url}coupon/`, config);
    return res.data;
};

const postCoupon = async (coupon) => {
    const res = await axios.post(`${base_url}coupon/`, coupon, config);
    return res.data;
};
const putCoupon = async (coupon) => {
    const res = await axios.put(
        `${base_url}coupon/${coupon.id}`,
        {
            name: coupon.couponData.name,
            expiry: coupon.couponData.expiry,
            discount: coupon.couponData.discount,
        },
        config
    );
    return res.data;
};
const deleteCoupon = async (id) => {
    const res = await axios.delete(`${base_url}coupon/${id}`, config);
    return res.data;
};
const getCoupon = async (id) => {
    const res = await axios.get(`${base_url}coupon/${id}`, config);
    return res.data;
};

const CouponService = {
    getCoupons,
    postCoupon,
    putCoupon,
    deleteCoupon,
    getCoupon,
};

export default CouponService;
