import React from "react";
import { useDispatch } from "../context/CartContext";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch({
      type: "ADD",
      payload: product,
    });
  };
  return (
    <div>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>

      <p>
        <strong>₹ {product.price}</strong>
      </p>

      <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  );
};

export default ProductCard;
