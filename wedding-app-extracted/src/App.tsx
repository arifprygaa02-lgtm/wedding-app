import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import VendorPage from './pages/VendorPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'shop':
        return <ShopPage onNavigate={setCurrentPage} globalSearchTerm={globalSearchTerm} />;
      case 'vendors':
        return <VendorPage onNavigate={setCurrentPage} globalSearchTerm={globalSearchTerm} />;
      case 'cart':
        return <CartPage onNavigate={setCurrentPage} />;
      case 'orders':
        return <OrdersPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar 
            currentPage={currentPage} 
            onNavigate={setCurrentPage}
            onGlobalSearch={handleGlobalSearch}
          />
          <main>
            {renderPage()}
          </main>
          {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;