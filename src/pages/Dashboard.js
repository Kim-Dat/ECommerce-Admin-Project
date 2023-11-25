import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table } from "antd";
const data1 = [
    {
        key: "1",
        name: "John Brown",
        product: "iphone",
        address: "New York No. 1 Lake Park",
        state: "pending",
    },
    {
        key: "2",
        name: "Joe Black",
        product: "laptop",
        address: "London No. 1 Lake Park",
        state: "pending",
    },
    {
        key: "3",
        name: "Jim Green",
        product: "tivi",
        address: "Sydney No. 1 Lake Park",
        state: "pending",
    },
    {
        key: "4",
        name: "Jim Red",
        product: "loa",
        address: "London No. 2 Lake Park",
        state: "pending",
    },
];
const Dashboard = () => {
    const data = [
        {
            type: "Tháng 1",
            sales: 38,
        },
        {
            type: "Tháng 2",
            sales: 52,
        },
        {
            type: "Tháng 3",
            sales: 61,
        },
        {
            type: "Tháng 4",
            sales: 145,
        },
        {
            type: "Tháng 5",
            sales: 48,
        },
        {
            type: "Tháng 6",
            sales: 38,
        },
        {
            type: "Tháng 7",
            sales: 38,
        },
        {
            type: "Tháng 8",
            sales: 38,
        },
        {
            type: "Tháng 9",
            sales: 38,
        },
        {
            type: "Tháng 10",
            sales: 38,
        },
        {
            type: "Tháng 11",
            sales: 38,
        },
        {
            type: "Tháng 12",
            sales: 38,
        },
    ];
    const config = {
        data,
        xField: "type",
        yField: "sales",
        color: ({ type }) => {
            return "#1677ff";
        },
        label: {
            position: "middle",
            style: {
                fill: "#FFFFFF",
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };
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
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Product",
            dataIndex: "product",
            key: "product",
            width: "30%",
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Status",
            dataIndex: "state",
            key: "state",
            width: "5%",
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
    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex align-items-center justify-content-between gap-3">
                <div className="d-flex flex-grow-1 justify-content-between align-items-center bg-white p-3 rounded-3 p-3 box-shadow">
                    <div>
                        <p className="desc mb-2">Total</p>
                        <h4 className="sub-title">500.000vnd</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h5 className="green mb-2">
                            <BsGraphUpArrow />
                            32%
                        </h5>
                        <p className="desc">Compared To April 2023</p>
                    </div>
                </div>
                <div className="d-flex flex-grow-1 justify-content-between align-items-center bg-white p-3 rounded-3 p-3 box-shadow">
                    <div>
                        <p className="desc mb-2">Total</p>
                        <h4 className="sub-title">500.000vnd</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h5 className="red mb-2">
                            <BsGraphDownArrow />
                            32%
                        </h5>
                        <p className="desc">Compared To April 2023</p>
                    </div>
                </div>
                <div className="d-flex flex-grow-1 justify-content-between align-items-center bg-white p-3 rounded-3 p-3 box-shadow">
                    <div>
                        <p className="desc mb-2">Total</p>
                        <h4 className="sub-title">500.000vnd</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h5 className="green mb-2">
                            <BsGraphUpArrow />
                            32%
                        </h5>
                        <p className="desc">Compared To April 2023</p>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <h3 className="mb-4 title">Income Statics</h3>
                <div>
                    <Column {...config} />
                </div>
            </div>
            <div className="mt-5">
                <h3 className="mb-4 title">Recent Order</h3>
                <div>
                    <Table columns={columns} dataSource={data1} className="box-shadow" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
