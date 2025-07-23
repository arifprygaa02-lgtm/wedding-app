import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Upload, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { Order } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'dp' | 'full'>('dp');
  const [paymentProof, setPaymentProof] = useState<File | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      onNavigate('auth');
      return;
    }

    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('wedding_orders') || '[]');
    setOrders(savedOrders);
  }, [isAuthenticated, onNavigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Menunggu Konfirmasi';
      case 'confirmed':
        return 'Dikonfirmasi';
      case 'in-progress':
        return 'Sedang Dikerjakan';
      case 'completed':
        return 'Selesai';
      default:
        return status;
    }
  };

  const handlePaymentUpload = (orderId: string) => {
    if (!paymentProof) {
      alert('Pilih file bukti pembayaran terlebih dahulu');
      return;
    }

    // Update order with payment info
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          paymentStatus: paymentMethod,
          paymentProof: paymentProof.name
        };
      }
      return order;
    });

    setOrders(updatedOrders);
    localStorage.setItem('wedding_orders', JSON.stringify(updatedOrders));
    setSelectedOrder(null);
    setPaymentProof(null);
    alert('Bukti pembayaran berhasil diupload!');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pesanan Saya</h1>
          <p className="text-gray-600">Kelola dan pantau status pesanan pernikahan Anda</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Belum Ada Pesanan
            </h3>
            <p className="text-gray-600 mb-6">
              Anda belum memiliki pesanan apapun
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Pesanan #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Dibuat pada {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2 text-sm font-medium">
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Tanggal Acara</p>
                        <p className="font-medium">{formatDate(order.eventDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Lokasi</p>
                        <p className="font-medium">{order.eventLocation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-800 mb-3">Produk yang Dipesan:</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded mr-3"
                            />
                            <div>
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium text-sm">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total Pembayaran:</span>
                      <span className="text-xl font-bold text-rose-600">
                        {formatPrice(order.total)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm">
                          Status Pembayaran: 
                          <span className={`ml-2 font-medium ${
                            order.paymentStatus === 'none' ? 'text-gray-600' :
                            order.paymentStatus === 'dp' ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            {order.paymentStatus === 'none' ? 'Belum Bayar' :
                             order.paymentStatus === 'dp' ? 'DP (50%)' :
                             'Lunas'}
                          </span>
                        </span>
                      </div>

                      {order.paymentStatus === 'none' && (
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors duration-200 flex items-center"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Pembayaran
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Upload Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Upload Bukti Pembayaran
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Total: {formatPrice(selectedOrder.total)}
                </p>
                <p className="text-sm text-gray-600">
                  Pesanan #{selectedOrder.id}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metode Pembayaran
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="dp"
                      checked={paymentMethod === 'dp'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'dp')}
                      className="mr-2"
                    />
                    <span className="text-sm">DP (50%) - {formatPrice(selectedOrder.total * 0.5)}</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="full"
                      checked={paymentMethod === 'full'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'full')}
                      className="mr-2"
                    />
                    <span className="text-sm">Lunas - {formatPrice(selectedOrder.total)}</span>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bukti Transfer
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={() => handlePaymentUpload(selectedOrder.id)}
                  className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;