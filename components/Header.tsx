'use client';
import { Menu, ShoppingCart, User, Search, X } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { state } = useCart();
  const { data: session } = useSession();
  const [search, setSearch] = useState('');
  const router = useRouter();
  const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = () => {
    if (search.trim()) router.push(`/itemlist?q=${search}`);
  };

  return (
    <div>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button 
              aria-label="Toggle Menu" 
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              {/* <div className="w-8 h-8 bg-[#0D6EFD] rounded-lg flex items-center justify-center text-white text-base font-bold">
                B
              </div>
              <span className="font-bold text-xl text-[#0D6EFD] hidden sm:block">Brand</span> */}
              <Image src="/Image/Brand/logo-colored.svg" alt="Brand Logo" width={150} height={150} />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl relative items-center">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search products, brands, categories..." 
              className="w-full bg-[#F3F3F3] pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 focus:bg-white text-sm transition-all"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-1 bg-[#0D6EFD] text-white text-xs font-semibold px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {session ? (
              <>
                {session.user?.role === 'admin' && (
                  <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 text-gray-700 text-xs font-medium">
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => signOut()}
                  className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 text-gray-700 text-xs font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 text-gray-700 text-xs font-medium">
                  Login
                </Link>
                <Link href="/signup" className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 text-gray-700 text-xs font-medium">
                  Sign Up
                </Link>
              </>
            )}

            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 text-gray-700 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs hidden md:inline font-medium">My Cart</span>
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Sub-header Categories Bar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="flex overflow-x-auto gap-3 px-4 py-3 w-full scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-7xl mx-auto">
          <Link href="/itemlist" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">All category</Link>
          <Link href="/itemlist?q=Furniture" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">Furniture</Link>
          <Link href="/itemlist?q=Lighting" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">Lighting</Link>
          <Link href="/itemlist?q=Electronics" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">Electronics</Link>
          <Link href="/itemlist?q=Decor" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">Decor</Link>
          <Link href="/itemlist?q=Office" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">Office</Link>
          <Link href="/itemlist?q=Fashion" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">Fashion</Link>
          <Link href="/itemlist?q=Sports" className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs md:text-sm font-medium rounded-lg px-3 py-1.5 transition-colors">Sports</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
