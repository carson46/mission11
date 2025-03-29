import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/Cart';
import { CartProvider } from './context/CartContext';
function App() {
  return (
    <>
    <CartProvider>
       <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/purchase/:title/:bookID" element={<PurchasePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
     
    </>
  );
}

export default App;
