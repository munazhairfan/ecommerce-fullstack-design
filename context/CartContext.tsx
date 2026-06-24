'use client';
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

type CartItem = { _id: string; name: string; price: number; image: string; quantity: number };
type State = { items: CartItem[] };
type Action = 
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const CartContext = createContext<{ 
  state: State; 
  dispatch: React.Dispatch<Action>;
  getCartTotal: () => number;
} | undefined>(undefined);

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_CART':
      return { items: action.payload };
    case 'ADD_TO_CART':
      const newId = String(action.payload._id);
      console.log('Adding to cart:', action.payload);
      
      const existing = state.items.find(item => String(item._id) === newId);
      if (existing) {
        return { 
          items: state.items.map(item => 
            String(item._id) === newId ? { ...item, quantity: item.quantity + 1 } : item
          ) 
        };
      }
      return { items: [...state.items, { ...action.payload, _id: newId, quantity: 1 }] };
    case 'REMOVE_FROM_CART':
      const removeId = String(action.payload);
      return { items: state.items.filter(item => String(item._id) !== removeId) };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const getCartTotal = () => state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
