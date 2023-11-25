import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcategory from "./pages/Addcategory";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/reset-password" element={<Resetpassword />}></Route>
                <Route path="/forgot-password" element={<Forgotpassword />}></Route>
                <Route path="/admin" element={<MainLayout />}>
                    <Route index element={<Dashboard />}></Route>
                    <Route path="enquiries" element={<Enquiries />}></Route>
                    <Route path="blog" element={<Addblog />}></Route>
                    <Route path="blog-list" element={<Bloglist />}></Route>
                    <Route path="coupon" element={<AddCoupon />}></Route>
                    <Route path="coupon/:id" element={<AddCoupon />}></Route>
                    <Route path="coupon-list" element={<CouponList />}></Route>
                    <Route path="blog-category" element={<Addblogcat />}></Route>
                    <Route path="blog-category-list" element={<Blogcatlist />}></Route>
                    <Route path="orders" element={<Orders />}></Route>
                    <Route path="customers" element={<Customers />}></Route>
                    <Route path="color" element={<Addcolor />}></Route>
                    <Route path="color/:id" element={<Addcolor />}></Route>
                    <Route path="color-list" element={<Colorlist />}></Route>
                    <Route path="category" element={<Addcategory />}></Route>
                    <Route path="category/:id" element={<Addcategory />}></Route>
                    <Route path="category-list" element={<Categorylist />}></Route>
                    <Route path="brand" element={<Addbrand />}></Route>
                    <Route path="brand/:id" element={<Addbrand />}></Route>
                    <Route path="brand-list" element={<Brandlist />}></Route>
                    <Route path="product" element={<Addproduct />}></Route>
                    <Route path="product-list" element={<Productlist />}></Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
