import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import EcommerceResponsivePage from '@/components/EcommerceResponsivePage';

export default async function Page() {
  await dbConnect();
  const products = await Product.find({}).lean();
  
  // Convert _id to string for serialization as a prop
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <EcommerceResponsivePage products={serializedProducts} />;
}
