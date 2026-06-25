import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductListContent from './ProductListContent';

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  await dbConnect();
  
  const query = (await searchParams).q;
  
  let products;
  if (query) {
    products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    }).lean();
  } else {
    products = await Product.find({}).lean();
  }

  // Convert _id to string for serialization as a prop
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <ProductListContent products={serializedProducts} />;
}
