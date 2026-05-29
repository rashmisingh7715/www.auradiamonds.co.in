export interface Product {
  id: string;
  name: string;
  category: 'Silver' | 'Gold' | 'Diamond';
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  estimatedDelivery: string;
  actualDelivery?: string;
}
