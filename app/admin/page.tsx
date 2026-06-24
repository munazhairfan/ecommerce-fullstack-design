'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Product = { _id: string; name: string; price: number; image: string; description: string; category: string; stock: number };

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'admin')) {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, session, router]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const result = await res.json();
    setProducts(result.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingProduct ? 'PUT' : 'POST';
    const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
    
    // Note: You may need to create the PUT route in /api/products/[id]/route.ts
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({});
      fetchProducts();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <button onClick={() => { setEditingProduct(null); setFormData({}); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add New Product
        </button>
      </div>
      
      <table className="w-full text-left bg-white border rounded-lg">
        <thead className="border-b">
          <tr><th className="p-3">Name</th><th className="p-3">Price</th><th className="p-3">Actions</th></tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.price}</td>
              <td className="p-3">
                <button onClick={() => { setEditingProduct(p); setFormData(p); setIsModalOpen(true); }} className="text-blue-500 mr-3">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-md flex flex-col gap-3">
            <h2 className="font-bold text-lg">{editingProduct ? 'Edit' : 'Add'} Product</h2>
            <input placeholder="Name" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="border p-2" required />
            <input type="number" placeholder="Price" value={formData.price || ''} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="border p-2" required />
            <input placeholder="Image URL" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="border p-2" required />
            <input placeholder="Description" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="border p-2" required />
            <input placeholder="Category" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} className="border p-2" required />
            <input type="number" placeholder="Stock" value={formData.stock || ''} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="border p-2" required />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
