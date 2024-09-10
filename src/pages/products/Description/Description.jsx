import React, { useState } from 'react';
import '../Description/description.css';

const Description = ({ product }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="description">
            <div className="container">
                <div className="descriptionContainer">
                    <h3>Introduction</h3>
                    <p>
            
                        <div dangerouslySetInnerHTML={{ 
                                __html: showFullDescription ? product.description : truncateText(product.description, 30)
                            }} />
                    </p>
                    <span 
                        onClick={toggleDescription} 
                        style={{ color: 'blue', cursor: 'pointer' }}
                    >
                        {showFullDescription ? 'Show Less' : 'Read More'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Description;
