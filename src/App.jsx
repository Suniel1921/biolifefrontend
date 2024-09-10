import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Products from './pages/products/Products';
import Contact from './pages/contact/Contact';
import ProductDetails from './pages/products/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';
import Footer from './components/footer/Footer';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';
import AdminRoute from './components/admin/adminProtectedRoute/AdminProtectedRoute';
import CreateCategory from './components/admin/dashboardMainContent/category/CreateCategory';
import CreateProduct from './components/admin/dashboardMainContent/products/CreateProduct';
import CreateBrand from './components/admin/dashboardMainContent/brand/CreateBrand';
import Blog from './pages/blog/Blog';
import GetAllProducts from './components/admin/dashboardMainContent/products/GetAllProducts';


const App = () => {

  return (
    <>
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/products-details/:slug' element={<ProductDetails/>}/>
            {/* <Route path='/products-details/:id' element={<ProductDetails/>}/> */}
            <Route path='/products' element={<Products />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/blog' element={<Blog/>} />

            {/* protected route */}
            <Route element={<ProtectedRoute />}>    
            <Route path='/checkout' element={<Checkout/>}/>
            </Route>

            {/* admin protected route */}
            <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='admin/createProduct' element={<CreateProduct/>}/>
            <Route path='admin/createCategory' element={<CreateCategory/>}/>
            <Route path='admin/createBrand' element={<CreateBrand/>}/>
            <Route path='admin/getallproduct' element={<GetAllProducts/>}/>
            </Route>
           

        </Routes>
        <Toaster />
        <Footer/>
    </Router>
    </>
  )
}

export default App




