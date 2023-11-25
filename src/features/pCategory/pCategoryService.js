import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductCategories = async () => {
    const res = await axios.get(`${base_url}prodcategory/`);
    return res.data;
};
const getProductCategory = async (id) => {
    const res = await axios.get(`${base_url}prodcategory/${id}`);
    return res.data;
};

const postProductCategories = async (cate) => {
    const res = await axios.post(`${base_url}prodcategory/`, cate, config);
    return res.data;
};
const putProductCategory = async (cate) => {
    const res = await axios.put(
        `${base_url}prodcategory/${cate.id}`,
        { title: cate.cateData.title },
        config
    );
    return res.data;
};
const deleteProductCategory = async (id) => {
    const res = await axios.delete(`${base_url}prodcategory/${id}`, config);
    return res.data;
};

const pCategoryService = {
    getProductCategories,
    postProductCategories,
    putProductCategory,
    deleteProductCategory,
    getProductCategory,
};

export default pCategoryService;
