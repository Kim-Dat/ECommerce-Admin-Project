import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
/* start Icon */
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbBrandAirtable } from "react-icons/tb";
import { BiCategoryAlt, BiColorFill, BiCartAdd } from "react-icons/bi";
import { Layout, Menu, Button, theme } from "antd";
import { LiaBlogSolid, LiaThListSolid } from "react-icons/lia";
import { TbListDetails, TbShoppingCartUp, TbLogout2 } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiCouponLine, RiListIndefinite, RiQuestionAnswerLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { SiCoinmarketcap, SiMarketo } from "react-icons/si";
import { LuListTree } from "react-icons/lu";
import { TbBrandBlogger } from "react-icons/tb";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { PiUserList } from "react-icons/pi";
import { IoColorPaletteOutline } from "react-icons/io5";
/* end Icon */
import "react-toastify/dist/ReactToastify.css";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical">Dev/at.</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => {
                        if (key === "sign-out") {
                            localStorage.clear();
                            window.location.reload();
                            setTimeout(() => {
                                navigate("/");
                            }, 300);
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-4" />,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <PiUserList className="fs-4" />,
                            label: "Customers",
                        },
                        {
                            key: "Catalog",
                            icon: <LuListTree className="fs-4" />,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product",
                                    icon: <BiCartAdd className="fs-4" />,
                                    label: "Add Product",
                                },
                                {
                                    key: "product-list",
                                    icon: <HiOutlineClipboardDocumentList className="fs-4" />,
                                    label: "Product List",
                                },
                                {
                                    key: "brand",
                                    icon: <TbBrandAirtable className="fs-4" />,
                                    label: "Brand",
                                },
                                {
                                    key: "brand-list",
                                    icon: <LiaThListSolid className="fs-4" />,
                                    label: "Brand List",
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className="fs-4" />,
                                    label: "Add P-Category",
                                },
                                {
                                    key: "category-list",
                                    icon: <RiListIndefinite className="fs-4" />,
                                    label: "List P-Category",
                                },
                                {
                                    key: "color",
                                    icon: <BiColorFill className="fs-4" />,
                                    label: "Color",
                                },
                                {
                                    key: "color-list",
                                    icon: <IoColorPaletteOutline className="fs-4" />,
                                    label: "Color List",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <TbShoppingCartUp className="fs-4" />,
                            label: "Orders",
                        },
                        {
                            key: "marketing",
                            icon: <SiCoinmarketcap className="fs-4" />,
                            label: "Marketing",
                            children: [
                                {
                                    key: "coupon",
                                    icon: <RiCouponLine className="fs-4" />,
                                    label: "Add Coupon",
                                },
                                {
                                    key: "coupon-list",
                                    icon: <SiMarketo className="fs-4" />,
                                    label: "Coupon List",
                                },
                            ],
                        },
                        {
                            key: "blogs",
                            icon: <TbBrandBlogger className="fs-4" />,
                            label: "Blogs",
                            children: [
                                {
                                    key: "blog",
                                    icon: <LiaBlogSolid className="fs-4" />,
                                    label: "Add Blog",
                                },
                                {
                                    key: "blog-list",
                                    icon: <TbListDetails className="fs-4" />,
                                    label: "Blog List",
                                },
                                {
                                    key: "blog-category",
                                    icon: <LiaBlogSolid className="fs-4" />,
                                    label: "Add B-Category",
                                },
                                {
                                    key: "blog-category-list",
                                    icon: <TbListDetails className="fs-4" />,
                                    label: "List B-Category",
                                },
                            ],
                        },
                        {
                            key: "enquiries",
                            icon: <RiQuestionAnswerLine className="fs-4" />,
                            label: "Enquiries",
                        },
                        {
                            key: "sign-out",
                            icon: <TbLogout2 className="fs-4" />,
                            label: "Sign Out",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className="d-flex justify-content-between"
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-3 align-items-center px-3 dropdown">
                        <div className="position-relative">
                            <IoIosNotificationsOutline className="fs-3" />
                            <div className="notify-count">3</div>
                        </div>
                        <div className="d-flex align-items-center gap-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="avatar">
                                <img src="https://th.bing.com/th/id/OIP.2dHQlhClYZqrjIpQqQWBTAHaLH?w=134&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="avatar" />
                            </div>
                            <div className="info">
                                <h5>Kim Dat</h5>
                                <p>Nguyenkimdat13092003@gmail.com</p>
                            </div>
                        </div>
                        <ul className="dropdown-menu">
                            <Link to={"/"} className="dropdown-item lh-lg">
                                View Profile
                            </Link>
                            <Link to={"/"} className="dropdown-item lh-lg">
                                Signout
                            </Link>
                        </ul>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        maxHeight: "100vh",
                        background: "colorBgContainer",
                    }}
                >
                    <ToastContainer position="top-center" autoClose={400} hideProgressBar={false} newestOnTop={true} rtl={false} pauseOnFocusLoss draggable theme="light" />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
