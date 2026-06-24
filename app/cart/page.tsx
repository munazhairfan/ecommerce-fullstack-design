'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { state, dispatch, getCartTotal } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {state.items.map((item, index) => (
            <div key={item._id || index} className="flex justify-between items-center border-b p-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
              <span>{item.name} (x{item.quantity})</span>
              <span>${item.price * item.quantity}</span>
              <button 
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item._id })}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">Total: ${getCartTotal()}</div>
          <Link href="/checkout" className="inline-block mt-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
