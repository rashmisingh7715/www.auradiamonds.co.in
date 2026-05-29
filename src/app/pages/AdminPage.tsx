import { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';
import { Calendar, Package, Truck, CheckCircle, XCircle, Filter } from 'lucide-react';
import { format } from 'date-fns';

export function AdminPage() {
  const { orders, updateOrderStatus } = useCart();
  const [filterStatus, setFilterStatus] = useState<'all' | Order['orderStatus']>('all');
  const [sortBy, setSortBy] = useState<'date' | 'delivery'>('date');

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders;

    if (filterStatus !== 'all') {
      filtered = orders.filter((order) => order.orderStatus === filterStatus);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      } else {
        return new Date(a.estimatedDelivery).getTime() - new Date(b.estimatedDelivery).getTime();
      }
    });

    return sorted;
  }, [orders, filterStatus, sortBy]);

  const getStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-yellow-100 text-yellow-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['orderStatus']) => {
    const actualDelivery = newStatus === 'Delivered' ? new Date().toISOString() : undefined;
    updateOrderStatus(orderId, newStatus, actualDelivery);
  };

  const stats = {
    total: orders.length,
    processing: orders.filter((o) => o.orderStatus === 'Processing').length,
    shipped: orders.filter((o) => o.orderStatus === 'Shipped').length,
    delivered: orders.filter((o) => o.orderStatus === 'Delivered').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Order Management Dashboard</h1>
          <p className="text-gray-600">Track and manage all customer orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl text-[var(--navy)] mt-1">{stats.total}</p>
              </div>
              <Package className="h-10 w-10 text-[var(--gold)]" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing</p>
                <p className="text-3xl text-blue-600 mt-1">{stats.processing}</p>
              </div>
              <Calendar className="h-10 w-10 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shipped</p>
                <p className="text-3xl text-yellow-600 mt-1">{stats.shipped}</p>
              </div>
              <Truck className="h-10 w-10 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Delivered</p>
                <p className="text-3xl text-green-600 mt-1">{stats.delivered}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-sm">Filter & Sort</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Status:</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  >
                    <option value="all">All</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'delivery')}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                  >
                    <option value="date">Order Date</option>
                    <option value="delivery">Delivery Date</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Est. Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div>{order.customerName}</div>
                          <div className="text-gray-500">{order.customerPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        ₹{order.total.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {format(new Date(order.orderDate), 'dd MMM yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {order.actualDelivery ? (
                          <div>
                            <div className="text-green-600">
                              {format(new Date(order.actualDelivery), 'dd MMM yyyy')}
                            </div>
                            <div className="text-xs text-gray-500">Actual</div>
                          </div>
                        ) : (
                          <div>
                            <div>{format(new Date(order.estimatedDelivery), 'dd MMM yyyy')}</div>
                            <div className="text-xs text-gray-500">Estimated</div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as Order['orderStatus'])
                          }
                          className="px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
