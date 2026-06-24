'use client';
import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, User, Search, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function EcommerceResponsivePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Server returned an error');
        return res.json();
      })
      .then(res => {
        if (res.success) {
          setProducts(res.data);
        }
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FAFC] font-sans text-[#1C1C1C] antialiased">
      
      {/* 1. HEADER */}
      {/* ... (Existing header code) ... */}


      {/* MOBILE NAV DRAWER OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsMenuOpen(false)} />
          <div className="relative w-72 max-w-sm bg-white h-full p-5 shadow-xl flex flex-col gap-4 animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-bold text-lg text-[#0D6EFD]">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 rounded hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {['All category', 'Gadgets', 'Clothes', 'Accessories', 'Home'].map((item, idx) => (
                <a key={idx} href="#" className="py-2 px-3 rounded-md hover:bg-gray-50 text-sm font-medium text-gray-700">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* 2. SUB-NAV / SEARCH BAR FOR MOBILE */}
      <div className="p-4 bg-white border-b border-gray-100 md:border-none block md:hidden">
        <div className="relative flex items-center mb-3">
          <Search className="absolute left-3 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-[#F3F3F3] pl-10 pr-4 py-2.5 rounded-lg border border-transparent focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>
        
        {/* Horizontal Navigation Scroll Tags */}
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
          {['All category', 'Gadgets', 'Clothes', 'Accessories', 'Home'].map((category, idx) => (
            <span 
              key={idx} 
              className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap cursor-pointer transition-colors ${
                idx === 0 
                  ? 'bg-[#E3F0FF] text-[#0D6EFD] font-medium' 
                  : 'bg-[#EFF2F4] text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT BODY WRAPPER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">

        {/* 3. HERO BANNER */}
        <section className="rounded-xl bg-[#9be0cb] relative overflow-hidden flex min-h-[160px] md:min-h-[220px] items-center">
          <div className="z-10 flex flex-col justify-center max-w-[60%] md:max-w-[45%] ml-6">
            <p className="text-xs md:text-sm font-medium tracking-wide text-gray-600 uppercase">Latest trending</p>
            <h2 className="text-xl md:text-3xl font-extrabold leading-tight mt-1 text-[#1C1C1C]">Electronic items</h2>
            <button className="mt-4 bg-white text-[#1C1C1C] font-semibold text-xs md:text-sm px-5 py-2.5 rounded-lg shadow-xs w-max hover:bg-gray-50 transition-colors">
              Learn more
            </button>
          </div>
          {/* Mock Product Graphic Position */}
          <div className="absolute right-0 flex items-center justify-center">
            <Image src="/Image/banners/banner.png" alt="Hero Banner" width={260} height={260} className="object-cover" />
          </div>
        </section>

        {/* 4. DEALS AND OFFERS */}
        <section className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-2xs flex flex-col md:flex-row gap-6">
          <div className="flex justify-between items-start md:flex-col md:justify-center md:min-w-[200px] md:border-r md:border-gray-100 md:pr-6">
            <div>
              <h3 className="font-bold text-base md:text-lg">Deals and offers</h3>
              <p className="text-xs text-gray-400 mt-0.5">Electronic equipments</p>
            </div>
            {/* Countdown Timers */}
            <div className="flex gap-1.5 md:mt-4">
              {[ { val: '13', label: 'Hour' }, { val: '34', label: 'Min' }, { val: '56', label: 'Sec' } ].map((timer, idx) => (
                <div key={idx} className="bg-[#EFF2F4] rounded-lg px-2.5 py-1.5 text-center min-w-[40px]">
                  <p className="text-xs md:text-sm font-bold text-gray-700 leading-none">{timer.val}</p>
                  <p className="text-[9px] md:text-[10px] text-gray-400 mt-1">{timer.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Horizontal / Grid Deals Shelf */}
          <div className="flex-1 flex gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1">
            {products.filter(p => p.category === 'Decor').slice(0, 5).map((item) => (
              <Link href={`/item/${item._id}`} key={item._id} className="flex flex-col items-center min-w-[110px] md:min-w-[130px] bg-white text-center group cursor-pointer">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 group-hover:scale-105 transition-transform overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs text-gray-600 mt-2.5 truncate w-full px-1">{item.name}</p>
                <span className="mt-1.5 px-2.5 py-0.5 bg-[#FFE3E3] text-[#EB001B] font-bold text-[10px] md:text-xs rounded-full">
                  -{Math.floor(Math.random() * 30 + 10)}%
                </span>
              </Link>
            ))}
          </div>
          </section>
          {/* 5 & 6. SPLIT DESKTOP SECTIONS CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

             {/* HOME AND OUTDOOR */}
          <section className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base md:text-lg mb-4">Home and outdoor</h3>
              <div className="grid grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                {products.filter(p => ['Furniture', 'Lighting', 'Home'].includes(p.category)).slice(0, 3).map((item) => (
                  <Link href={`/item/${item._id}`} key={item._id} className="p-3 bg-white flex flex-col justify-between min-h-[130px] hover:bg-gray-50 transition-colors cursor-pointer">
                    <div>
                      <p className="text-xs md:text-sm text-gray-800 font-medium line-clamp-1">{item.name}</p>
                      <p className="text-[10px] md:text-xs text-gray-400 mt-1">${item.price}</p>
                    </div>
                    <div className="w-16 h-16 self-end mt-2 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/itemlist" className="w-full text-left text-sm text-[#0D6EFD] font-semibold mt-4 flex items-center gap-1 hover:text-blue-700 transition-colors">
              Source now &rarr;
            </Link>
          </section>

          {/* CONSUMER ELECTRONICS */}
          <section className="bg-white rounded-xl p-4 md:p-6 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-base md:text-lg mb-4">Consumer electronics</h3>
              <div className="grid grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-lg overflow-hidden">
                {products.filter(p => ['Electronics', 'Office', 'Lighting', 'Home'].includes(p.category)).slice(0, 3).map((item) => (
                  <Link href={`/item/${item._id}`} key={item._id} className="p-3 bg-white flex flex-col justify-between min-h-[130px] hover:bg-gray-50 transition-colors cursor-pointer">
                    <div>
                      <p className="text-xs md:text-sm text-gray-800 font-medium line-clamp-1">{item.name}</p>
                      <p className="text-[10px] md:text-xs text-gray-400 mt-1">${item.price}</p>
                    </div>
                    <div className="w-16 h-16 self-end mt-2 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/itemlist" className="w-full text-left text-sm text-[#0D6EFD] font-semibold mt-4 flex items-center gap-1 hover:text-blue-700 transition-colors">
              Source now &rarr;
            </Link>
          </section>


        </div>

        <div className='bg-slate-100'>
    <p className='px-4 pt-4 font-bold text-lg'>Recommended Items</p>
    <div className='flex overflow-auto w-full gap-2 p-3'>
      {products.map((item) => (
        <Link href={`/item/${item._id}`} key={item._id} className='w-36 h-56 bg-white p-4 flex-none border border-slate-300 rounded-md hover:shadow-md transition-shadow'>
          <img src={item.image} alt={item.name} className='w-full h-32 object-cover' />
          <p className='font-bold mt-2'>${item.price}</p>
          <p className='text-gray-500 text-sm line-clamp-2'>{item.name}</p>
        </Link>
      ))}
    </div>
  </div>
  </main>
  </div>
  );
  }

