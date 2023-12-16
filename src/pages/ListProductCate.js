import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
    deleteCategory,
    getProductCategories,
    resetState,
} from "../features/pCategory/pCategorySlice";
import CustomModal from "../components/CustomModal";

const ListProductCate = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [open, setOpen] = useState(false);
    const [productCategoryId, setProductCategoryId] = useState("");

    const showModal = (e) => {
        setOpen(true);
        setProductCategoryId(e);
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
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
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
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
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
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
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
            width: "25%",
            ...getColumnSearchProps("title"),
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "15%",
        },
    ];
    const { pCategories } = useSelector((state) => state.productCategory);
    const handleProductCategories = pCategories.map(
        (productCategory, index) => ({
            ...productCategory,
            action: (
                <div className="d-flex align-items-center flex-nowrap justify-content-start">
                    <Link
                        to={`/admin/category/${productCategory._id}`}
                        className="fs-4 text-primary"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-3 text-danger bg-transparent border-0"
                        onClick={() => showModal(productCategory._id)}
                    >
                        <MdOutlineDelete />
                    </button>
                </div>
            ),
            key: index + 1,
        })
    );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getProductCategories());
    }, []);
    const handleDeleteProductCategory = async (e) => {
        await dispatch(deleteCategory(e));
        setOpen(false);
        await dispatch(getProductCategories());
    };
    return (
        <div>
            <h3 className="mb-5 title">Product Categories</h3>
            <Table
                columns={columns}
                dataSource={handleProductCategories}
                className="box-shadow"
            />
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    handleDeleteProductCategory(productCategoryId);
                }}
                title="Are you sure you want to delete this brand?"
            />
        </div>
    );
};

export default ListProductCate;
