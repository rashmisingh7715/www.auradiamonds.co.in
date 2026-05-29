import { useParams, Link } from 'react-router';
import { ArrowLeft, ShoppingCart, Shield, Award } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link to="/shop" className="text-[var(--gold)] hover:underline">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-[var(--navy)] hover:text-[var(--gold)] mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="text-sm text-[var(--gold)] mb-2 uppercase tracking-wider">
              {product.category} Collection
            </div>
            <h1 className="text-4xl mb-4">{product.name}</h1>
            <div className="text-3xl text-[var(--navy)] mb-6">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[var(--gold)] text-[var(--dark-navy)] px-8 py-4 rounded hover:bg-[var(--navy)] hover:text-white transition-colors flex items-center justify-center gap-3 text-lg"
              >
                <ShoppingCart className="h-6 w-6" />
                Add to Cart
              </button>
            </div>

            <div className="border-t border-gray-200 pt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-[var(--gold)] flex-shrink-0" />
                <div>
                  <h3 className="text-sm mb-1">Certified Authentic</h3>
                  <p className="text-sm text-gray-600">
                    Comes with certificate of authenticity
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-6 w-6 text-[var(--gold)] flex-shrink-0" />
                <div>
                  <h3 className="text-sm mb-1">Premium Quality</h3>
                  <p className="text-sm text-gray-600">
                    Ethically sourced with superior craftsmanship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
