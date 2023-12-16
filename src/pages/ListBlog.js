import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getBlogs,
    resetState,
    deleteBlog,
} from "../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModal from "../components/CustomModal";
const ListBlog = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");

    const showModal = (e) => {
        setOpen(true);
        setBlogId(e);
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
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: "25%",
            ...getColumnSearchProps("category"),
            sorter: (a, b) => a.category.length - b.category.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "15%",
        },
    ];
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getBlogs());
    }, []);
    const { blogs } = useSelector((state) => state.blog);
    const handleBlog = blogs.map((blog, index) => ({
        ...blog,
        action: (
            <div className="d-flex align-items-center flex-nowrap justify-content-start">
                <Link
                    to={`/admin/blog/${blog._id}`}
                    className="fs-4 text-primary"
                >
                    <BiEdit />
                </Link>
                <button
                    className="ms-3 fs-3 text-danger bg-transparent border-0"
                    onClick={() => showModal(blog._id)}
                >
                    <MdOutlineDelete />
                </button>
            </div>
        ),
        key: index + 1,
    }));
    const handleDeleteBlog = async (e) => {
        setOpen(false);
        await dispatch(deleteBlog(e));
        await dispatch(getBlogs());
    };
    return (
        <div>
            <h3 className="mb-5 title">Blog list</h3>
            <Table
                columns={columns}
                dataSource={handleBlog}
                className="box-shadow"
            />
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    handleDeleteBlog(blogId);
                }}
                title="Are you sure you want to delete this Blog?"
            />
        </div>
    );
};

export default ListBlog;
