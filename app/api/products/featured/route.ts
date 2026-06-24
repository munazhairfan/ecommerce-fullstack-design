import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

// GET: Fetch featured products (limit 8)
export async function GET() {
  await dbConnect();
  try {
    // Assuming 'featured' field exists or you want just the first 8. 
    // If you need a specific 'featured' flag, update query: .find({ featured: true }).limit(8)
    const products = await Product.find({}).limit(8);
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch featured products' }, { status: 400 });
  }
}
