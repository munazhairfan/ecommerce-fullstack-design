'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { state, getCartTotal } = useCart();
  const [formData, setFormData] = useState({ name: '', address: '', city: '', zip: '' });

  const handlePlaceOrder = () => {
    alert('Order placed successfully! (This is a placeholder)');
  };

  return (
    <div className="bg-[#F7FAFC] py-8 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#1C1C1C]">Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            <div className="space-y-4">
              {state.items.map(item => (
                <div key={item._id} className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <span>{item.name} x {item.quantity}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 text-xl font-bold flex justify-between">
              <span>Total</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
            <h2 className="font-bold text-lg mb-4">Shipping Information</h2>
            <form className="flex flex-col gap-4">
              <input 
                placeholder="Full Name" 
                className="border border-gray-300 p-2.5 rounded-lg w-full"
                onChange={e => setFormData({...formData, name: e.target.value})}
                required
              />
              <input 
                placeholder="Address" 
                className="border border-gray-300 p-2.5 rounded-lg w-full"
                onChange={e => setFormData({...formData, address: e.target.value})}
                required
              />
              <div className="flex gap-4">
                <input 
                  placeholder="City" 
                  className="border border-gray-300 p-2.5 rounded-lg w-full"
                  onChange={e => setFormData({...formData, city: e.target.value})}
                  required
                />
                <input 
                  placeholder="Zip Code" 
                  className="border border-gray-300 p-2.5 rounded-lg w-full"
                  onChange={e => setFormData({...formData, zip: e.target.value})}
                  required
                />
              </div>
              <button 
                type="button"
                onClick={handlePlaceOrder}
                className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-medium p-3 rounded-lg mt-4 transition-colors"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
