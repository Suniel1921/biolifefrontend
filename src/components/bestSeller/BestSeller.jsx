import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../bestSeller/bestSeller.css';
import { toast } from 'react-hot-toast';

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
      if (response.data.success) {
        const allProducts = response.data.getAllProducts;
        setProducts(allProducts);
        setFilterData(allProducts);
        setLoading(false);

        // Extract unique categories
        const uniqueCategories = [...new Set(allProducts.map(product => product.category.categoryName))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilterData(products);
    } else {
      const filtered = products.filter(product => product.category.categoryName === category);
      setFilterData(filtered);
    }
  };

  return (
    <div className="bestSeller">
      <div className="container">
        <div className="bestSellerContainer">
          {/* Filter section */}
          <div className="filterContainer">
            <div className="filterHeading">
              <h3 className='homeHeading'>Best Sellers</h3>
            </div>
            <div className="categoryFilter">
              <p onClick={() => handleCategoryClick('All')} className={selectedCategory === 'All' ? 'active' : ''}>All</p>
              {
                categories.map(category => (
                  <p 
                    key={category} 
                    onClick={() => handleCategoryClick(category)} 
                    className={selectedCategory === category ? 'active' : ''}
                  >
                    {category}
                  </p>
                ))
              }
            </div>
          </div>

          {/* Card section */}
          <div className="allProducts">
            {
              loading ? (
                <p>Loading...</p>
              ) : (
                filterData.length > 0 ? (
                  filterData.map((product) => (
                    <Link className='link' key={product._id} to={`/products-details/${product.slug}`}>
                      <div className='productChildContainer'>
                        <img className='productImg' src={product.images[0]} alt={product.name} />
                        <h2 className='productName product-title homePage_product_title'>
                          {product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}
                        </h2>
                        <p className='productHeading'>{product.heading}</p>
                        <div className="product-rating"> <span>⭐⭐⭐⭐⭐</span></div>
                        <div className="priceContainer">
                          <h4 className='salePrice'>Rs {product.salePrice}</h4>
                          <h4 className='realPrice'>Rs {product.realPrice}</h4>
                        </div>
                        <h4 className='productBrand'>{product.brand.brandName}</h4> {/* Render brandName instead of the whole brand object */}
                      </div>
                    </Link>
                  ))
                ) : (
                  <h2>Oops! No products found for the selected category.</h2>
                )
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;


