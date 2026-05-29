import { Link } from 'react-router';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Discover our stunning jewelry collection</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--dark-navy)] px-6 py-3 rounded hover:bg-[var(--navy)] hover:text-white transition-colors"
          >
            Shop Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row gap-6"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product.id}`}
                    className="hover:text-[var(--gold)]"
                  >
                    <h3 className="mb-1">{item.product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.product.category}
                  </p>
                  <p className="text-lg text-[var(--navy)]">
                    ₹{item.product.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4">
                  <div className="flex items-center gap-2 border border-gray-300 rounded">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-[var(--navy)]">
                      ₹{getCartTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/checkout"
                className="block w-full bg-[var(--gold)] text-[var(--dark-navy)] text-center px-6 py-4 rounded hover:bg-[var(--navy)] hover:text-white transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/shop"
                className="block w-full text-center text-[var(--navy)] hover:text-[var(--gold)] mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
