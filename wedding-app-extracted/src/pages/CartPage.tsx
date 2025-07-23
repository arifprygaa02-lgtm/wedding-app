import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Calendar, MapPin, CreditCard } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Order } from '../types';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      onNavigate('auth');
      return;
    }
    setShowCheckout(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventDate || !eventLocation) {
      alert('Harap lengkapi tanggal dan lokasi acara');
      return;
    }

    // Create new order
    const newOrder: Order = {
      id: Date.now().toString(),
      userId: 'user1',
      items: [...items],
      total,
      eventDate,
      eventLocation,
      status: 'pending',
      paymentStatus: 'none',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage (simulate database)
    const existingOrders = JSON.parse(localStorage.getItem('wedding_orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('wedding_orders', JSON.stringify(existingOrders));

    // Clear cart
    clearCart();
    
    // Navigate to orders page
    onNavigate('orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-600 mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
          <button
            onClick={() => onNavigate('shop')}
            className="bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
          >
            Mulai Belanja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h1>
            <p className="text-gray-600">{items.length} produk dalam keranjang</p>
          </div>

          {!showCheckout ? (
            <>
              {/* Cart Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.product.vendor}</p>
                        <p className="text-rose-600 font-medium">{formatPrice(item.product.price)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 mt-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total and Checkout */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-rose-600">{formatPrice(total)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200 flex items-center justify-center"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Checkout
                </button>
              </div>
            </>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Detail Acara</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Tanggal Acara
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Lokasi Acara
                  </label>
                  <textarea
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    required
                    rows={3}
                    placeholder="Masukkan alamat lengkap lokasi acara"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total Pembayaran:</span>
                  <span className="text-rose-600">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
                >
                  Buat Pesanan
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;