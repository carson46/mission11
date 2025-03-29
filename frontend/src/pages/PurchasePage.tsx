// pages/PurchasePage.tsx
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import WelcomBand from '../components/WelcomeBand';
import { Book } from '../types/Books';
import { useCart } from '../context/CartContext';

function PurchasePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state as Book;
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      bookID: book.bookID,
      title: book.title,
      price: book.price,
    });
    navigate('/cart');
  };

  return (
    <>
      <WelcomBand />
      <h2>Purchase {book.title}</h2>
      <div>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <br />
      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}

export default PurchasePage;
