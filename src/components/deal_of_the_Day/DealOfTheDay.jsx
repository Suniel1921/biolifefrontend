import React, { useEffect, useState } from 'react';
import '../deal_of_the_Day/dealOfTheDay.css';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useCartGlobally } from '../../context/CartContext';
import { Skeleton } from 'antd';

const DealOfTheDay = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const { addToCart } = useCartGlobally();
    
    // Timer duration
    const initialHours = 2;
    const initialMinutes = 40;
    const initialSeconds = 3;
    const initialTime = (initialHours * 3600 + initialMinutes * 60 + initialSeconds) * 1000;
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer); // Stop the timer when it reaches zero
                    return 0;
                }
                return prevTime - 1000; // Decrease the time by 1 second
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = formatTime(timeLeft);

    // Fetch all products
    const getAllProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/product/getAllProduct`);
            if (response.data.success) {
                setProducts(response.data.getAllProducts);
                setSelectedProduct(response.data.getAllProducts[0]); // Set the first product as the selected product
                setSelectedImage(response.data.getAllProducts[0].images[0]); // Set the first image as the selected image
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Something went wrong');
            }
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    const handleAddToCart = () => {
        addToCart(selectedProduct);
        toast.success('Item added to cart');
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    if (!selectedProduct) {
        return (
            <div className="container">
                <div className="deal-of-the-day">
                    <div className="deal-info">
                        <Skeleton active title={false} paragraph={{ rows: 4 }} />
                    </div>
                    <div className="deal-product">
                        <div className="product-images">
                            <Skeleton.Image className="product-thumbnail-skeleton" />
                        </div>
                        <div className="product-main">
                            <Skeleton.Image className="product-main-image-skeleton" />
                        </div>
                        <div className="product-info">
                            <Skeleton active title={false} paragraph={{ rows: 4 }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="deal-of-the-day">
                <div className="deal-info">
                    <div className="deal-text">
                        <p className="deal-only-today">ONLY FOR TODAY</p>
                        <h2 className="deal-title">Deal Of The Day</h2>
                        <p className="deal-description">
                            Deal of the Day for deals on consumer electronics. Watch for many other great daily offers.
                        </p>
                    </div>
                    <div className="deal-timer">
                        <div className="timer-box">
                            <span className="timer-number">{String(hours).padStart(2, '0')}</span>
                            <span className="timer-label">Hours</span>
                        </div>
                        <div className="timer-box">
                            <span className="timer-number">{String(minutes).padStart(2, '0')}</span>
                            <span className="timer-label">Mins</span>
                        </div>
                        <div className="timer-box">
                            <span className="timer-number">{String(seconds).padStart(2, '0')}</span>
                            <span className="timer-label">Secs</span>
                        </div>
                    </div>
                </div>
                <div className="deal-product">
                    <div className="product-images">
                        {selectedProduct.images.map((image, index) => (
                            <img
                                key={index}
                                className="product-thumbnail"
                                src={image}
                                alt={`Product Thumbnail ${index + 1}`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                    <div className="product-main">
                        <img className="product-main-image" src={selectedImage} alt="Main Product" />
                    </div>
                    <div className="product-info">
                        <h3 className="product-brand">{selectedProduct.brand.brandName}</h3>
                        <h2 className="product-title">{selectedProduct.name}</h2>
                        <div className="product-rating">
                            <span>⭐⭐⭐⭐⭐</span>
                        </div>
                        <p className="product-price">
                            <span className="product-new-price">Rs {selectedProduct.salePrice}</span>
                            <span className="product-old-price">Rs {selectedProduct.realPrice}</span>
                        </p>
                        <p className="product-features">
                            Fast charging 18W, 50% in 30 min USB Power Delivery 2.0 nQi wireless charging
                        </p>
                        <button className='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealOfTheDay;
