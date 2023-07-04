import { useContext, useRef } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartTotal, setCartIconRef } =
    useContext(CartContext);

  const cartIconContainerRef = useRef();

  setCartIconRef(cartIconContainerRef);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <div
      ref={cartIconContainerRef}
      className="cart-icon-container"
      onClick={toggleIsCartOpen}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartTotal}</span>
    </div>
  );
};

export default CartIcon;
