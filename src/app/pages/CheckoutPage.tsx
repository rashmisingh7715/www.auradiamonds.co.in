import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCart } from '../context/CartContext';
import { CreditCard, Smartphone, Building2, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, getCartTotal, placeOrder } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    paymentMethod: 'card',
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.shippingAddress) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.paymentMethod === 'card') {
      if (!cardData.cardNumber || !cardData.cardName || !cardData.expiryDate || !cardData.cvv) {
        toast.error('Please fill in all card details');
        return;
      }
    }

    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    placeOrder({
      ...formData,
      paymentStatus: 'Completed',
      orderStatus: 'Processing',
      estimatedDelivery: deliveryDate.toISOString(),
    });

    setIsProcessing(false);
    setIsSuccess(true);

    toast.success('Order placed successfully!');

    setTimeout(() => {
      navigate('/admin');
    }, 3000);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-lg shadow-lg max-w-md">
          <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <p className="text-sm text-gray-500">Redirecting to order management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl mb-6">Customer Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">
                    Shipping Address <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl mb-6">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
                    className={`flex-1 p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      formData.paymentMethod === 'card'
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="h-5 w-5" />
                    Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'upi' }))}
                    className={`flex-1 p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      formData.paymentMethod === 'upi'
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Smartphone className="h-5 w-5" />
                    UPI
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'netbanking' }))}
                    className={`flex-1 p-4 border-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Building2 className="h-5 w-5" />
                    Bank
                  </button>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="block text-sm mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardData.cardName}
                        onChange={handleCardChange}
                        placeholder="Name on card"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardData.expiryDate}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'upi' && (
                  <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm mb-2">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                    />
                  </div>
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm mb-2">Select Bank</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[var(--gold)]">
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>State Bank of India</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm">{item.product.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST 3%)</span>
                  <span>₹{Math.round(getCartTotal() * 0.03).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg">
                    <span>Total</span>
                    <span className="text-[var(--navy)]">
                      ₹{Math.round(getCartTotal() * 1.03).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[var(--gold)] text-[var(--dark-navy)] px-6 py-4 rounded hover:bg-[var(--navy)] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${Math.round(getCartTotal() * 1.03).toLocaleString('en-IN')}`
                )}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
