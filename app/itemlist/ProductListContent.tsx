'use client';
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

export default function ProductListContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { dispatch } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const url = query ? `/api/products/search?q=${query}` : '/api/products';
    fetch(url)
      .then(res => res.json())
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, [query]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="bg-[#F7FAFC] py-6 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-3">
        {currentProducts.map((product) => (
          <div 
            key={product._id} 
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-stretch hover:shadow-xs transition-shadow"
          >
            <div className="w-full md:w-48 h-44 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-100 overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between flex-1 gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="font-semibold text-[#1C1C1C] text-base md:text-lg hover:text-blue-600 cursor-pointer transition-colors leading-snug">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                </div>
                <p className="text-sm text-gray-500 max-w-2xl leading-relaxed line-clamp-2 md:line-clamp-none">
                  {product.description}
                </p>
                <Link href={`/item/${product._id}`} className="text-sm font-semibold text-[#0D6EFD] hover:underline block pt-1">
                  View details
                </Link>
              </div>

              <div className="sm:self-start flex-shrink-0 pt-1 w-full sm:w-auto">
                <button 
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0D6EFD] hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg border border-transparent transition-colors shadow-xs"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 py-4">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
