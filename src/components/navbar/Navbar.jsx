import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../navbar/Navbar.css';
import { useAuthGlobally } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useCartGlobally } from '../../context/CartContext';
import { TbMenuDeep } from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";
import { Badge } from '@mui/material';
import Search from '../search/Search';

const Navbar = () => {
  const [auth, setAuth] = useAuthGlobally();
  const { cart } = useCartGlobally();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      user: null,
      token: null
    });
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    toast.success('Logout Successfully');
    navigate('/login');
  };

  return (
    <div className="navbarContainer">
      <div className="container">
        <div className="navbar">

          <div className="logo">
            <Link to={'/'}><img className='logoImg' src="/images/bio_life_Logo.png" alt="Bio Life Logo" /></Link>
          </div>

          <div className='searchComponent'>
            <Search />
          </div>

          <div>
            <ul className='navlinks'>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/products">Products</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>

              <li><NavLink to="/blog">Blog</NavLink></li>
              {
                auth?.user ? (
                  <div className="navbar-user">
                    <li onClick={handleLogout}><NavLink to="#">Logout</NavLink></li>
                  </div>
                ) : (
                  <>
                    <li><NavLink to="/login">Login</NavLink></li>
                  </>
                )
              }
            </ul>
          </div>
          <NavLink to="/cart">
            <Badge badgeContent={cart.length} color="error">
              <div className='cart-icon'>
                <FiShoppingCart />
              </div>
            </Badge>
          </NavLink>
          <p className='hamburgerMenu'><TbMenuDeep /></p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;