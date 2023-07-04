import "./cart-dropdown.styles.scss";
import { useContext, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { cartItems, cartPrice, setIsCartOpen, cartIconRef } =
    useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  const dropDownRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!dropDownRef.current?.contains(e.target)) {
        setIsCartOpen(false);
      }
      if (cartIconRef.current.contains(e.target)) {
        setIsCartOpen(true);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div ref={dropDownRef} className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      {`Total £${cartPrice}`}
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
