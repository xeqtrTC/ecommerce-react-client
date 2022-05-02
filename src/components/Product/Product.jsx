import React from 'react'
import { Link } from 'react-router-dom'

export default function Product(props) {
    const { product } = props;
  return (
    <div key={product.id} className="products-info">
          <div className="products-info-images">
          <Link to={`/product/${product.id}`}><img src={product.image} alt="razer"/>
          </Link>

          </div>
          <div className="product-info-name">
              <Link to={`/product/${product.id}`}>{product.name}</Link>
          </div>
          <div className="product-info-details">
             {product.descritpion}
            </div> 
          <div className="product-info-price">
              <p>&euro;<span>{product.price}</span></p>
          </div>
        </div>
  )
}