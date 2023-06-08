import { Link } from "react-router-dom";

import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  return (
    <Link to={"/item/" + id} className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {" "}
          {quantity} X £{price}
        </span>
      </div>
    </Link>
  );
};

export default CartItem;

