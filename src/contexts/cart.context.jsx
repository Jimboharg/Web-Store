import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const itemExists = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (itemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id && cartItem.quantity > 0
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, productToDelete) =>
  cartItems.filter((item) => productToDelete.id !== item.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartTotal: 0,
  removeItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    const totalItems = cartItems.reduce(
      (currentTotalItems, cartItem) => currentTotalItems + cartItem.quantity,
      0
    );
    setCartTotal(totalItems);
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (currentTotalPrice, cartItem) =>
        currentTotalPrice + cartItem.quantity * cartItem.price,
      0 
    );
    setCartPrice(totalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartItems,
    cartTotal,
    cartPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};