import { Link } from 'react-router';
import { ArrowRight, Shield, Truck, Award, Phone } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import visitingCardFront from '../../imports/Visitng_Card_Front.png';

export function HomePage() {
  const featuredProducts = products.slice(0, 6);

  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(15, 52, 96, 0.85), rgba(22, 33, 62, 0.85)), url(${visitingCardFront})`,
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl mb-6 font-serif">
            AURA DIAMONDS
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-[var(--gold)] tracking-widest">
            SHINE WITH A CONSCIENCE
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover our exquisite collection of ethically sourced Silver, Gold, and Diamond jewelry
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-[var(--gold)] text-[var(--dark-navy)] px-8 py-4 rounded hover:bg-white transition-colors inline-flex items-center justify-center gap-2"
            >
              Shop Collection
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="tel:+919997413269"
              className="border-2 border-white text-white px-8 py-4 rounded hover:bg-white hover:text-[var(--dark-navy)] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-5 w-5" />
              +91-9997413269
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/shop?category=Silver"
              className="group relative h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative h-full flex items-center justify-center">
                <h2 className="text-4xl text-white font-serif">SILVER</h2>
              </div>
            </Link>

            <Link
              to="/shop?category=Gold"
              className="group relative h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)] to-yellow-600 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative h-full flex items-center justify-center">
                <h2 className="text-4xl text-white font-serif">GOLD</h2>
              </div>
            </Link>

            <Link
              to="/shop?category=Diamond"
              className="group relative h-64 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--navy)] to-blue-800 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative h-full flex items-center justify-center">
                <h2 className="text-4xl text-white font-serif">DIAMONDS</h2>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Featured Collection</h2>
            <p className="text-gray-600">Handpicked pieces from our premium selection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[var(--navy)] text-white px-6 py-3 rounded hover:bg-[var(--gold)] hover:text-[var(--dark-navy)] transition-colors"
            >
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--dark-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-[var(--gold)] mb-4" />
              <h3 className="text-xl mb-2">Certified Quality</h3>
              <p className="text-gray-300 text-sm">
                All our jewelry comes with authenticity certificates
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 text-[var(--gold)] mb-4" />
              <h3 className="text-xl mb-2">Secure Delivery</h3>
              <p className="text-gray-300 text-sm">
                Safe and insured shipping across India
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-[var(--gold)] mb-4" />
              <h3 className="text-xl mb-2">Ethical Sourcing</h3>
              <p className="text-gray-300 text-sm">
                Responsibly sourced materials with full transparency
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
