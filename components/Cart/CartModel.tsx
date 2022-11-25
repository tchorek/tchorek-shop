import { CartItem } from './CartContext';

export const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem('TCHOREK_SHOPPING_CART');
  if (!itemsFromLocalStorage) {
    return [];
  }
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem('TCHOREK_SHOPPING_CART', JSON.stringify(cartItems));
};
