import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
    const res = await axios.get(`${base_url}blogcategory/`);
    return res.data;
};

const postBlogCategory = async (BlogCate) => {
    const res = await axios.post(`${base_url}blogcategory/`, BlogCate, config);
    return res.data;
};

const bCategoryService = {
    getBlogCategories,
    postBlogCategory,
};

export default bCategoryService;
