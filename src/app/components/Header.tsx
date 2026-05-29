import { Link } from 'react-router';
import { ShoppingCart, Menu, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../../imports/LOGO_DESIGN.jpg';

export function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-[var(--dark-navy)] text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Aura Diamonds" className="h-14 w-14 object-contain rounded" />
            <div>
              <div className="font-serif text-xl tracking-wide">AURA DIAMONDS</div>
              <div className="text-xs text-[var(--gold)] tracking-wider">SHINE WITH A CONSCIENCE</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-[var(--gold)] transition-colors">
              Home
            </Link>
            <Link to="/shop" className="hover:text-[var(--gold)] transition-colors">
              Shop
            </Link>
            <Link to="/shop?category=Silver" className="hover:text-[var(--gold)] transition-colors">
              Silver
            </Link>
            <Link to="/shop?category=Gold" className="hover:text-[var(--gold)] transition-colors">
              Gold
            </Link>
            <Link to="/shop?category=Diamond" className="hover:text-[var(--gold)] transition-colors">
              Diamonds
            </Link>
            <a href="tel:+919997413269" className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
              <Phone className="h-4 w-4" />
              <span className="text-sm">+91-9997413269</span>
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative hover:text-[var(--gold)] transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--gold)] text-[var(--dark-navy)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
