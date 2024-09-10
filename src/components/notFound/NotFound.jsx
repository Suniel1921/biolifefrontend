import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../notFound/notfound.css'
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notFoundContainer">
      <div className="notFoundContent">
        <img className="notFoundImage" src="/images/noSearch.jpg" alt="Not Found" />
        <h1 className="notFoundTitle">Oops! Nothing to See Here</h1>
        <p className="notFoundText">We couldn't find any products matching your criteria. Try adjusting your filters or search terms.</p>
      </div>
    </div>
  );
};

export default NotFound;
