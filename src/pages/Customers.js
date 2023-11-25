import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const Customers = () => {
    /* table */
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
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "30%",
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            width: "10%",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            ...getColumnSearchProps("address"),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
        },
    ];
    /* handle */
    const dispatch = useDispatch();
    const { customers } = useSelector((state) => state.customer);
    const dataCustomerUser = customers
        .filter((customer) => customer.role !== "admin")
        .map((customer, index) => ({
            ...customer,
            name: `${customer.firstname} ${customer.lastname}`,
            key: index + 1
        }))
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    return (
        <div>
            <h3 className="mb-5 title">Customers</h3>
            <Table columns={columns} dataSource={dataCustomerUser} className="box-shadow" />
        </div>
    );
};

export default Customers;
