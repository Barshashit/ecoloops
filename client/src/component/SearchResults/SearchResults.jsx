// src/component/SearchResults/SearchResults.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import productData from '../../data/product';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('query')?.toLowerCase() || '';

  const filteredProducts = productData.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="search-results-container">
      <h2>
        Search results for: <strong>{searchTerm}</strong>
      </h2>

      {filteredProducts.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <a href={`/${product.htmlFile}`} target="_blank" rel="noopener noreferrer" className='"view-product-link'>
  View Product
</a>

              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
              <p>
                <strong>Eco-friendly:</strong> {product.ecoFriendly ? 'Yes' : 'No'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
