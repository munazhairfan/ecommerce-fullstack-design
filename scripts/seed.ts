// scripts/seed.ts
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const products = [
  // Existing products ...
  { name: "Modern Sofa", price: 899, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc", description: "Luxurious 3-seater sofa with premium fabric and wooden legs.", category: "Furniture", stock: 8 },
  { name: "Minimalist Chair", price: 149, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267", description: "Elegant dining chair with comfortable cushioning.", category: "Furniture", stock: 15 },
  { name: "Coffee Table", price: 249, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d", description: "Sleek wooden coffee table with storage compartment.", category: "Furniture", stock: 12 },
  { name: "Dining Table", price: 549, image: "https://images.unsplash.com/photo-1657524398377-567034729507", description: "Elegant wooden dining table for 6 persons.", category: "Furniture", stock: 6 },
  { name: "Bedside Table", price: 89, image: "https://images.unsplash.com/photo-1499933374294-4584851497cc", description: "Minimalist nightstand with drawer.", category: "Furniture", stock: 14 },
  { name: "Bookshelf", price: 299, image: "https://images.unsplash.com/photo-1543248939-4296e1fea89b", description: "Tall 5-tier wooden bookshelf.", category: "Furniture", stock: 9 },
  { name: "Storage Ottoman", price: 119, image: "https://images.unsplash.com/photo-1593195150503-8e2a51338ff2", description: "Multifunctional storage ottoman bench.", category: "Furniture", stock: 10 },
  { name: "Recliner Chair", price: 450, image: "https://images.unsplash.com/photo-1664560724581-e3b068a0a376", description: "Comfortable leather recliner.", category: "Furniture", stock: 5 },

  { name: "Floor Lamp", price: 89, image: "https://images.unsplash.com/photo-1673939859210-23d8444237ff", description: "Tall modern floor lamp with adjustable brightness.", category: "Lighting", stock: 20 },
  { name: "Table Lamp", price: 45, image: "https://images.unsplash.com/photo-1753932847231-7949af383b98", description: "Stylish ceramic table lamp for bedside or desk.", category: "Lighting", stock: 25 },
  { name: "Pendant Light", price: 69, image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89", description: "Modern geometric pendant lighting.", category: "Lighting", stock: 17 },
  { name: "Desk Lamp", price: 65, image: "https://images.unsplash.com/photo-1617363020293-62faac14783d", description: "LED desk lamp with touch control.", category: "Lighting", stock: 18 },
  { name: "Wall Sconce", price: 55, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15", description: "Modern minimalist wall lighting.", category: "Lighting", stock: 12 },

  { name: "Wool Area Rug", price: 129, image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80", description: "Soft and durable wool rug in neutral tones.", category: "Decor", stock: 10 },
  { name: "Abstract Wall Art", price: 95, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853", description: "Modern abstract canvas painting ready to hang.", category: "Decor", stock: 18 },
  { name: "Decorative Throw Pillow", price: 28, image: "https://images.unsplash.com/photo-1691256676366-370303d55b61", description: "Soft velvet cushion with elegant pattern.", category: "Decor", stock: 35 },
  { name: "Vanity Mirror", price: 119, image: "https://images.unsplash.com/photo-1608501200359-354b01a203fa", description: "LED lighted makeup vanity mirror.", category: "Decor", stock: 11 },
  { name: "Throw Blanket", price: 45, image: "https://images.unsplash.com/photo-1664989845570-6f03c42c47f6", description: "Soft cozy knitted throw blanket.", category: "Decor", stock: 23 },
  { name: "Plant Stand", price: 59, image: "https://images.unsplash.com/photo-1599009944997-3544a939813c", description: "Modern wooden plant stand for indoor plants.", category: "Decor", stock: 12 },
  { name: "Wall Mirror", price: 85, image: "https://images.unsplash.com/photo-1618220179428-22790b461013", description: "Large decorative wall mirror.", category: "Decor", stock: 8 },

  { name: "Office Desk", price: 399, image: "https://images.unsplash.com/photo-1623177623442-979c1e42c255", description: "Spacious wooden office desk with cable management.", category: "Office", stock: 7 },
  { name: "Ergonomic Office Chair", price: 329, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7", description: "Comfortable ergonomic chair with lumbar support.", category: "Office", stock: 14 },
  { name: "Monitor Stand", price: 49, image: "https://images.unsplash.com/photo-1587749091345-1fe70810b8f5", description: "Height adjustable monitor stand with storage.", category: "Office", stock: 22 },
  { name: "Laptop Sleeve", price: 39, image: "https://images.unsplash.com/photo-1689757855413-9e366c2011f1", description: "Protective 15-inch laptop sleeve.", category: "Office", stock: 28 },
  { name: "Desk Organizer", price: 25, image: "https://images.unsplash.com/photo-1700451761309-656bd9439443", description: "Wooden desktop organizer.", category: "Office", stock: 30 },

  { name: "Wireless Headphones", price: 159, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e", description: "Premium noise-cancelling wireless headphones.", category: "Electronics", stock: 16 },
  { name: "Smart Watch", price: 249, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", description: "Fitness tracking smartwatch with heart rate monitor.", category: "Electronics", stock: 11 },
  { name: "Wireless Mouse", price: 45, image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7", description: "Ergonomic silent wireless mouse.", category: "Electronics", stock: 22 },
  { name: "Mechanical Keyboard", price: 129, image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2", description: "RGB backlit mechanical keyboard.", category: "Electronics", stock: 13 },
  { name: "Wireless Earbuds", price: 89, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb", description: "True wireless noise cancelling earbuds.", category: "Electronics", stock: 14 },
  { name: "Bluetooth Speaker", price: 79, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1", description: "Portable waterproof bluetooth speaker.", category: "Electronics", stock: 20 },

  { name: "Ceramic Dinner Set", price: 85, image: "https://images.unsplash.com/photo-1727257050264-33a4f5f0982a", description: "Elegant 16-piece ceramic dinnerware set.", category: "Kitchen", stock: 9 },
  { name: "Stainless Steel Kettle", price: 65, image: "https://images.unsplash.com/photo-1594213114663-d94db9b17125", description: "Electric stainless steel water kettle.", category: "Kitchen", stock: 19 },
  { name: "Ceramic Mug Set", price: 32, image: "https://images.unsplash.com/photo-1542556398-95fb5b9f9b48", description: "Set of 4 handmade ceramic coffee mugs.", category: "Kitchen", stock: 31 },
  { name: "Stainless Steel Pan", price: 55, image: "https://images.unsplash.com/photo-1592824555997-fdf785dad8d4", description: "Non-stick stainless steel frying panhttps://images.unsplash.com/photo-1714675739369-7f00f4544416.", category: "Kitchen", stock: 16 },
  { name: "Blender", price: 120, image: "https://images.unsplash.com/photo-1622818426197-d54f85b88690", description: "High-speed blender for smoothies.", category: "Kitchen", stock: 10 },

  { name: "Leather Backpack", price: 119, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", description: "Stylish and durable genuine leather backpack.", category: "Fashion", stock: 13 },
  { name: "Sunglasses", price: 79, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f", description: "UV protection polarized sunglasses.", category: "Fashion", stock: 24 },
  { name: "Denim Jacket", price: 89, image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7", description: "Classic unisex denim jacket.", category: "Fashion", stock: 19 },
  { name: "Running Shoes", price: 129, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", description: "Lightweight breathable running shoes.", category: "Fashion", stock: 21 },
  { name: "Leather Wallet", price: 45, image: "https://images.unsplash.com/photo-1627123424574-724758594e93", description: "Minimalist genuine leather wallet.", category: "Fashion", stock: 30 },

  { name: "Yoga Mat", price: 35, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f", description: "Premium non-slip eco-friendly yoga mat.", category: "Sports", stock: 30 },
  { name: "Dumbbell Set", price: 129, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", description: "Adjustable weight dumbbell set.", category: "Sports", stock: 6 },
  { name: "Resistance Bands Set", price: 25, image: "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b", description: "Set of 5 resistance bands with handles.", category: "Sports", stock: 26 },
  { name: "Water Bottle", price: 28, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8", description: "Insulated stainless steel water bottle.", category: "Sports", stock: 40 },
  { name: "Sports Watch", price: 99, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314", description: "Durable digital sports watch.", category: "Sports", stock: 15 },

  { name: "Air Purifier", price: 199, image: "https://images.unsplash.com/photo-1732229033839-c76b4071c449", description: "Smart HEPA air purifier for home.", category: "Home", stock: 8 },
  { name: "Essential Oil Diffuser", price: 49, image: "https://images.unsplash.com/photo-1639677357385-92d3c33c0766", description: "Aromatherapy ultrasonic diffuser.", category: "Home", stock: 15 },
  { name: "Robot Vacuum", price: 350, image: "https://images.unsplash.com/photo-1762501748150-7fd88647fc2c", description: "Smart robot vacuum for easy cleaning.", category: "Home", stock: 7 },
  { name: "Smart Plug", price: 20, image: "https://images.unsplash.com/photo-1565049981953-379c9c2a5d48", description: "Wi-Fi enabled smart plug.", category: "Home", stock: 50 }
];

async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('❌ MONGO_URI is not defined in .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log(`✅ Database seeded successfully with ${products.length} products!`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();