import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { getAllOrders } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";


const Orders = () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
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
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "25%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Products",
            dataIndex: "products",
            key: "products",
            width: "25%",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            width: "25%",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: "25%",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "15%",
        },
    ];
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.auth);
    const handleOrder = orders.map((order, index) => ({
        ...order,
        name: `${order.orderby.firstname} ${order.orderby.lastname}`,
        products: (
            <ul>
                {order.products.map((p, i) => (
                    <li key={i}>{p.product.title}</li>
                ))}
            </ul>
        ),
        date: new Date(order.createdAt).toLocaleString(),
        amount: order.paymentIntent.amount,
        action: (
            <div className="d-flex align-items-center flex-nowrap justify-content-start">
                <Link to={"/"} className="fs-4 text-primary">
                    <BiEdit />
                </Link>
                <Link to={"/"} className={"fs-4 ms-3 text-danger"}>
                    <MdOutlineDelete />
                </Link>
            </div>
        ),
        status: (
            <>
                <select name="" className="form-control form-select" id="">
                    <option value={""}>Set Status</option>
                </select>
            </>
        ),
        key: index + 1,
    }));
    useEffect(() => {
        dispatch(getAllOrders());
    }, []);
    return (
        <div>
            <h3 className="mb-5 title">Orders</h3>
            <Table columns={columns} dataSource={handleOrder} className="box-shadow" />
        </div>
    );
};

export default Orders;