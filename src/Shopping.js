import React from 'react';
import './App.css';

const Basket = ({products, plusOne, minusOne}) => {
  const Product = products.map((product) => {
    return (
      <div key={product._id} className={"Product"}>
        {product.selected > 0 ? <span onClick={() => minusOne(product._id)}>-</span> : null}
        <p>{product.name} : {product.price} {product.currency}</p>
        <span onClick={() => plusOne(product._id)}>+</span>
      </div>
    );
  });
  
  return (
    <div>
      <ul className={"Products"}>
        {Product}
      </ul>
    </div>
  );
};

Basket.propTypes = {
  plusOne: React.PropTypes.func.isRequired,
  minusOne: React.PropTypes.func.isRequired,
  products: React.PropTypes.array.isRequired
};

export default Basket;