import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProducts = async () => {
    const res = await axios.get(`${base_url}product/`);
    return res.data;
};
const getProduct = async (id) => {
    const res = await axios.get(`${base_url}product/${id}`);
    return res.data;
};
const postProduct = async (product) => {
    const res = await axios.post(`${base_url}product/`, product, config);
    return res.data;
};
const putProduct = async (product) => {
    const res = await axios.put(
        `${base_url}product/${product.id}`,product.productData,
        config
    );
    return res.data;
};

const deleteProduct = async (id) => {
    const res = await axios.delete(`${base_url}product/${id}`, config);
    return res.data;
};

const productService = {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    getProduct,
};

export default productService;
