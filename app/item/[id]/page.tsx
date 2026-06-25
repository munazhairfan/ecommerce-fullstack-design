import React from "react";
import Image from "next/image";
import Link from 'next/link';
import AddToCartButton from "@/components/AddToCartButton";

async function getProduct(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const result = await res.json();
  return result.data;
}

async function getSimilarProducts(category: string, currentProductId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/products/search?q=${encodeURIComponent(category)}`, { cache: 'no-store' });
    if (!res.ok) return [];
    const result = await res.json();
    return result.success ? result.data.filter((p: any) => p._id !== currentProductId).slice(0, 8) : [];
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);
  
  if (!product) return <div>Product not found</div>;
  
  const similarProducts = await getSimilarProducts(product.category, product._id);

  return (
    <div>
      <div className="flex flex-col md:flex-row bg-white">
        <div className="w-full h-80 flex relative flex-none md:w-1/2">
          <Image 
            fill 
            src={product.image || '/placeholder.png'} 
            alt={product.name || 'Product Image'}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex w-full items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Image key={i} width={16} height={16} src={"/Image/icons/star.png"} alt="star" />
              ))}
            </div>
            <div className="text-amber-400 text-sm h-4">7.5</div>
          </div>

          <p>{product.name}</p>
          <p className="text-red-500">${product.price.toFixed(2)}</p>

          <div className="w-full">
            <AddToCartButton product={product} />
          </div>

          <div className="py-3">
            <p className="text-slate-400 text-lg">Condition &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-700">Brand new</span></p>
            <p className="text-slate-400 text-lg">Material &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-700">Plastic</span></p>
            <p className="text-slate-400 text-lg">Category &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-700">{product.category}</span></p>
            <p className="text-slate-400 text-lg">Item num &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-700">23421</span></p>
          </div>
          <p className="text-slate-700">{product.description}</p>
        </div>
      </div>

      <div className='bg-slate-100'>
        <p className='px-4 pt-4 font-bold text-lg'>Similar Products</p>
        <div className='flex overflow-auto w-full gap-2 p-3'>
          {similarProducts.map((p: any) => (
            <Link href={`/item/${p._id}`} key={p._id} className='w-36 h-56 bg-white p-4 flex-none border border-slate-300 rounded-md hover:shadow-xs transition-shadow block'>
              <div className="w-full h-24 relative overflow-hidden rounded mb-2">
                <img src={p.image} alt={p.name} className='w-full h-full object-cover' />
              </div>
              <p className='font-bold text-black'>${p.price.toFixed(2)}</p>
              <p className='text-mist-400 text-xs line-clamp-2 mt-1'>{p.name}</p>
            </Link>
          ))}
          {similarProducts.length === 0 && (
            <p className="text-gray-500 text-sm p-4">No similar products found</p>
          )}
        </div>
      </div>
    </div>
  );
}
