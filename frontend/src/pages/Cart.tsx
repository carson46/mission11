// pages/Cart.tsx
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.bookID}>
              {item.title} - ${item.price}
              <button onClick={() => removeFromCart(item.bookID)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total}</h3>
      <button disabled={cart.length === 0}>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Shopping</button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default CartPage;
