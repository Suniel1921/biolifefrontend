import React from 'react';
import '../specification/specification.css'

const Specification = ({ product }) => {
  return (
    <div className="specification">
      <div className="container">
        <div className="specificationContainer">
          <h3>Specifications</h3>
          <table className="specificationTable">
            <tbody>
              <tr>
                <td><strong>Brand:</strong></td>
                <td>{product.brand.brandName}</td>
              </tr>
              <tr>
                <td><strong>Category:</strong></td>
                <td>{product.category.categoryName}</td>
              </tr>
              <tr>
                <td><strong>Real Price:</strong></td>
                <td>Rs {product.realPrice}</td>
              </tr>
              <tr>
                <td><strong>Sale Price:</strong></td>
                <td>Rs {product.salePrice}</td>
              </tr>
              {/* Add more specifications as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Specification;
