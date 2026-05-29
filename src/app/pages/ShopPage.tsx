import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const categoryParam = searchParams.get('category');

  useEffect(() => {
    if (categoryParam) {
      setFilteredProducts(
        products.filter((p) => p.category === categoryParam)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [categoryParam]);

  const categories = ['All', 'Silver', 'Gold', 'Diamond'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-4">Our Collection</h1>
          <p className="text-gray-600">
            Explore our premium range of fine jewelry
          </p>
        </div>

        <div className="mb-8 flex gap-4 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                if (category === 'All') {
                  setSearchParams({});
                } else {
                  setSearchParams({ category });
                }
              }}
              className={`px-6 py-2 rounded-full transition-colors ${
                (category === 'All' && !categoryParam) ||
                category === categoryParam
                  ? 'bg-[var(--gold)] text-[var(--dark-navy)]'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
