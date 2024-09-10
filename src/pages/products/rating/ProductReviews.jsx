import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../rating/productReview.css';
import { useAuthGlobally } from '../../../context/AuthContext';
import { Link } from 'react-router-dom'; // Add this import to use Link for navigation

const ProductReviews = ({ productId }) => {
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [auth] = useAuthGlobally();

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/review/getProductReviews/${productId}`);
                if (response.data.success) {
                    setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
                }
            } catch (error) {
                setError('Failed to fetch reviews');
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === null) {
            toast.error('Please select a rating');
            return;
        }
        setError('');
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/review/addReview`, {
                productId,
                rating,
                comment
            });
            console.log(response);
            if (response.data.success) {
                toast.success('Review added successfully!');
            }
            setRating(null);
            setComment('');
            const fetchReviews = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/review/getProductReviews/${productId}`);
                    setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            };
            fetchReviews();
        } catch (error) {
            toast.error('Error adding review');
            setError(`Failed to add review: ${error.response ? error.response.data.message : error.message}`);
            console.error('Error adding review:', error.response ? error.response.data : error);
        }
    };

    return (
        <div className='container'>
            <h3>Reviews</h3>
            <div>
                <h4>Existing Reviews</h4>
                {loading && <p>Loading reviews...</p>}
                {error && <p>{error}</p>}
                {Array.isArray(reviews) && reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review._id}>
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                            <p>By: {review.user ? review.user.name : 'Anonymous'}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
            {auth && auth.user ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Rating:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    className={`star ${star <= (rating || 0) ? 'filled' : ''}`}
                                    onClick={() => setRating(star)}
                                >
                                    &#9733;
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Comment:</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            ) : (
                <div>
                    <p>You must be logged in to leave a review.</p>
                    <Link to="/login">Click here to log in</Link>
                </div>
            )}
        </div>
    );
};

export default ProductReviews;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import '../rating/productReview.css';
// import { useAuthGlobally } from '../../../context/AuthContext';

// const ProductReviews = ({ productId }) => {
//     const [rating, setRating] = useState(null);
//     const [comment, setComment] = useState('');
//     const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [auth] = useAuthGlobally();

//     useEffect(() => {
//         const fetchReviews = async () => {
//             setLoading(true);
//             setError('');
//             try {
//                 const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/review/getProductReviews/${productId}`);
//                 if (response.data.success) {
//                     setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
//                 }
//             } catch (error) {
//                 setError('Failed to fetch reviews');
//                 console.error('Error fetching reviews:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchReviews();
//     }, [productId]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (rating === null) {
//             toast.error('Please select a rating');
//             return;
//         }
//         setError('');
//         try {
//             const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/review/addReview`, {
//                 productId,
//                 rating,
//                 comment
//             });
//             console.log(response);
//             if (response.data.success) {
//                 toast.success('Review added successfully!');
//             }
//             setRating(null);
//             setComment('');
//             const fetchReviews = async () => {
//                 try {
//                     const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/review/getProductReviews/${productId}`);
//                     setReviews(Array.isArray(response.data.reviews) ? response.data.reviews : []);
//                 } catch (error) {
//                     console.error('Error fetching reviews:', error);
//                 }
//             };
//             fetchReviews();
//         } catch (error) {
//             toast.error('Error adding review');
//             setError(`Failed to add review: ${error.response ? error.response.data.message : error.message}`);
//             console.error('Error adding review:', error.response ? error.response.data : error);
//         }
//     };

//     return (
//         <div className='container'>
//             <h3>Reviews</h3>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Rating:</label>
//                     <div className="star-rating">
//                         {[1, 2, 3, 4, 5].map(star => (
//                             <span
//                                 key={star}
//                                 className={`star ${star <= (rating || 0) ? 'filled' : ''}`}
//                                 onClick={() => setRating(star)}
//                             >
//                                 &#9733;
//                             </span>
//                         ))}
//                     </div>
//                 </div>
//                 <div>
//                     <label>Comment:</label>
//                     <textarea
//                         value={comment}
//                         onChange={(e) => setComment(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Submit Review</button>
//             </form>
//             {loading && <p>Loading reviews...</p>}
//             {error && <p>{error}</p>}
//             <div>
//                 <h4>Existing Reviews</h4>
//                 {Array.isArray(reviews) && reviews.length > 0 ? (
//                     reviews.map(review => (
//                         <div key={review._id}>
//                             <p>Rating: {review.rating}</p>
//                             <p>Comment: {review.comment}</p>
//                             <p>By: {review.user ? review.user.name : 'Anonymous'}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No reviews yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductReviews;
