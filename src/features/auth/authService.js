import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const login = async (userData) => {
    const res = await axios.post(`${base_url}user/admin-login`, userData);
    if (res.data) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
};

const getAllOrders = async () => {
    const res = await axios.get(`${base_url}user/all-orders`, config);
    return res.data;
};

const authService = {
    login,
    getAllOrders,
};

export default authService;
