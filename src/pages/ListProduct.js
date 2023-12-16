import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct, resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const ListProduct = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState("");

    const showModal = (e) => {
        setOpen(true);
        setProductId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: "RowHead",
            dataIndex: "key",
            rowScope: "row",
            width: "5%",
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: "35%",
            ...getColumnSearchProps("title"),
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: "10%",
            sorter: (a, b) => a.price - b.price,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            width: "10%",
            ...getColumnSearchProps("brand"),
            sorter: (a, b) => a.brand.length - b.brand.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: "15%",
            ...getColumnSearchProps("category"),
            sorter: (a, b) => a.category.length - b.category.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
            width: "10%",
            ...getColumnSearchProps("color"),
            sorter: (a, b) => a.color.length - b.color.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "15%",
        },
    ];
    /* handle */
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);
    const handleProduct = products.map((product, index) => ({
        ...product,
        color: (
            <ul key={index} className="d-flex justify-content-start flex-wrap gap-2">
                {product.color.map((item, index) => (
                    <li key={index}>
                        <div style={{ width: "20px", height: "20px", backgroundColor: item.title, borderRadius: "50%" }}></div>
                    </li>
                ))}
            </ul>
        ),
        action: (
            <div className="d-flex align-items-center flex-nowrap justify-content-start">
                <Link to={`/admin/product/${product._id}`} className="fs-4 text-primary">
                    <BiEdit />
                </Link>
                <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModal(product._id)}>
                    <MdOutlineDelete />
                </button>
            </div>
        ),
        key: index,
    }));
    useEffect(() => {
        dispatch(resetState());
        dispatch(getProducts());
    }, []);
    const handleDeleteProduct = async (e) => {
        setOpen(false);
        await dispatch(deleteProduct(e));
        await dispatch(getProducts());
    };
    return (
        <div>
            <h3 className="mb-5 title">Products</h3>
            <Table columns={columns} dataSource={handleProduct} className="box-shadow" />
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    handleDeleteProduct(productId);
                }}
                title="Are you sure you want to delete this Blog?"
            />
        </div>
    );
};

export default ListProduct;
