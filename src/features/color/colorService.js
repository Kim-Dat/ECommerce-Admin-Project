import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getColors = async () => {
    const res = await axios.get(`${base_url}color/`);
    return res.data;
};

const postColor = async (color) => {
    const res = await axios.post(`${base_url}color/`, color, config);
    return res.data;
};

const putColor = async (color) => {
    const res = await axios.put(
        `${base_url}color/${color.id}`,
        { title: color.colorData.title },
        config
    );
    return res.data;
};
const getColor = async (id) => {
    const res = await axios.get(`${base_url}color/${id}`);
    return res.data;
};
const deleteColor = async (id) => {
    const res = await axios.delete(`${base_url}color/${id}`, config);
    return res.data;
};
const colorService = {
    getColors,
    postColor,
    putColor,
    deleteColor,
    getColor,
};

export default colorService;
