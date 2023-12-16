import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import ListBlog from "./pages/ListBlog";
import ListBlogCate from "./pages/ListBlogCate";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import ListColor from "./pages/ListColor";
import ListProductCate from "./pages/ListProductCate";
import ListBrand from "./pages/ListBrand";
import ListProduct from "./pages/ListProduct";
import AddBlog from "./pages/AddBlog";
import AddBlogCate from "./pages/AddBlogCate";
import AddColor from "./pages/AddColor";
import AddProductCate from "./pages/AddProductCate";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import AddCoupon from "./pages/AddCoupon";
import ListCoupon from "./pages/ListCoupon";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrder from "./pages/ViewOrder";
import PrivateRoutes from "./routing/PrivateRouter";
import PublicRoutes from "./routing/PublicRouter";
import BlockCustomer from "./pages/BlockCustomer";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PublicRoutes><Login /></PublicRoutes>}></Route>
                <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="enquiries" element={<Enquiries />}></Route>
                    <Route path="enquiry/:id" element={<ViewEnquiry />}></Route>
                    <Route path="blog" element={<AddBlog />}></Route>
                    <Route path="blog/:id" element={<AddBlog />}></Route>
                    <Route path="blog-list" element={<ListBlog />}></Route>
                    <Route path="coupon" element={<AddCoupon />}></Route>
                    <Route path="coupon/:id" element={<AddCoupon />}></Route>
                    <Route path="coupon-list" element={<ListCoupon />}></Route>
                    <Route path="blog-category" element={<AddBlogCate />}></Route>
                    <Route path="blog-category/:id" element={<AddBlogCate />}></Route>
                    <Route path="blog-category-list" element={<ListBlogCate />}></Route>
                    <Route path="orders" element={<Orders />}></Route>
                    <Route path="order/:id" element={<ViewOrder />}></Route>
                    <Route path="customers" element={<Customers />}></Route>
                    <Route path="blocked-customers" element={<BlockCustomer />}></Route>
                    <Route path="color" element={<AddColor />}></Route>
                    <Route path="color/:id" element={<AddColor />}></Route>
                    <Route path="color-list" element={<ListColor />}></Route>
                    <Route path="category" element={<AddProductCate />}></Route>
                    <Route path="category/:id" element={<AddProductCate />}></Route>
                    <Route path="category-list" element={<ListProductCate />}></Route>
                    <Route path="brand" element={<AddBrand />}></Route>
                    <Route path="brand/:id" element={<AddBrand />}></Route>
                    <Route path="brand-list" element={<ListBrand />}></Route>
                    <Route path="product" element={<AddProduct />}></Route>
                    <Route path="product/:id" element={<AddProduct />}></Route>
                    <Route path="product-list" element={<ListProduct />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
