'use client';
import { Suspense } from 'react';
import ProductListContent from './ProductListContent';

export default function ProductListPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListContent />
    </Suspense>
  );
}
