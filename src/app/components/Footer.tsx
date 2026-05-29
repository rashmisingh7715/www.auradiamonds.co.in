import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-[var(--dark-navy)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg mb-4 text-[var(--gold)]">About Aura Diamonds</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your trusted destination for exquisite silver, gold, and diamond jewelry.
              We bring you the finest craftsmanship with ethical sourcing and certified quality.
            </p>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-[var(--gold)]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[var(--gold)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[var(--gold)] transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[var(--gold)] transition-colors">
                  Order Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4 text-[var(--gold)]">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--gold)]" />
                <a href="tel:+919997413269" className="hover:text-[var(--gold)] transition-colors">
                  +91-9997413269
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--gold)]" />
                <a href="mailto:info@auradiamonds.com" className="hover:text-[var(--gold)] transition-colors">
                  info@auradiamonds.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[var(--gold)] mt-1" />
                <span className="text-gray-300">
                  Premium Jewelry Showroom<br />
                  India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Aura Diamonds. All rights reserved. | Shine with a Conscience</p>
        </div>
      </div>
    </footer>
  );
}
