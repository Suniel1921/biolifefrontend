import '../banner/banner.css'


import React from 'react';
import '../banner/banner.css';

const Banner = () => {
    return (
        <div className="custom-banner">
            <div className="custom-banner-content">
                <div className="custom-banner-tags">
                    <span className="custom-tag custom-trend-products">TREND PRODUCTS</span>
                    <span className="custom-tag custom-promotion-prices">PROMOTION PRICES</span>
                </div>
                <h1 className="custom-banner-title">New generation Ionizer - limited stocks!</h1>
                <div className="custom-banner-products">
                    <span><i className="fas fa-check"></i>Ionizer</span>
                    <span><i className="fas fa-check"></i> Phone</span>
                    <span><i className="fas fa-check"></i> Laptop</span>
                </div>
            </div>
            <div className="custom-banner-image">
                <img src="/images/banner.png" alt="Happy Customer" />
            </div>
            <div className="custom-banner-button">
                {/* <a href="#" className="custom-button">Check Products <i className="fas fa-arrow-right"></i></a> */}
            </div>
        </div>
    );
}

export default Banner;
