'use client';
import Button from "@/components/Button";
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }: { product: any }) {
  const { dispatch } = useCart();
  return (
    <Button 
      className="w-60 h-10 text-lg flex justify-center items-center" 
      text="Place order"
      onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
    />
  );
}
