import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlogCategories = async () => {
    const res = await axios.get(`${base_url}blogcategory/`);
    return res.data;
};

const postBlogCategory = async (blogCate) => {
    const res = await axios.post(`${base_url}blogcategory/`, blogCate, config);
    return res.data;
};

const putBlogCategory = async (blogCate) => {
    const res = await axios.put(
        `${base_url}blogcategory/${blogCate.id}`,
        { title: blogCate.blogCateData.title },
        config
    );
    return res.data;
};

const deleteBlogCategory = async (id) => {
    const res = await axios.delete(`${base_url}blogcategory/${id}`, config);
    return res.data;
};

const getBlogCategory = async (id) => {
    const res = await axios.get(`${base_url}blogcategory/${id}`, config);
    return res.data;
};

const bCategoryService = {
    getBlogCategories,
    postBlogCategory,
    putBlogCategory,
    deleteBlogCategory,
    getBlogCategory,
};

export default bCategoryService;
