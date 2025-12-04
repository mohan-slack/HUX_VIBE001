import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, Order, Address } from '../types';
import { HUX_PRODUCT } from '../constants';

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (color: string, size: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (address: Address, paymentMethod: 'UPI' | 'Card' | 'COD') => Promise<string>;
  products: Product[]; // Currently single product
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (color: string, size: number) => {
    // Check if same item exists
    const existingIndex = cart.findIndex(item => item.color === color && item.size === size);
    
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart(prev => [...prev, {
        product: HUX_PRODUCT,
        color: color as any,
        size: size as any,
        quantity: 1
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const newCart = [...prev];
      const newQuantity = newCart[index].quantity + delta;
      if (newQuantity > 0) {
        newCart[index].quantity = newQuantity;
        return newCart;
      }
      return prev;
    });
  };

  const clearCart = () => setCart([]);

  const placeOrder = async (address: Address, paymentMethod: 'UPI' | 'Card' | 'COD'): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          id: `HUX-${Math.floor(Math.random() * 100000)}`,
          items: [...cart],
          total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
          address,
          date: new Date().toISOString(),
          status: 'Processing',
          paymentMethod
        };
        setOrders(prev => [newOrder, ...prev]);
        clearCart();
        resolve(newOrder.id);
      }, 2000); // Simulate network
    });
  };

  return (
    <ShopContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      orders,
      placeOrder,
      products: [HUX_PRODUCT]
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
