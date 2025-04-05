// components/BookList.tsx
import { useEffect, useState } from 'react';
import { Book } from '../types/Books';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const { cart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  
    const loadBooks = async () => {
        try {
          setLoading(true);
          const data = await fetchBooks(pageSize, pageNumber, selectedCategories);
        
          setBooks(data.books);
          setTotalPages(Math.ceil(data.totalBooks / pageSize));
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
    };

    loadBooks();
  }, [pageSize, pageNumber, selectedCategories]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }
  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="alert alert-info mb-0">
          <strong>Cart Summary:</strong><br />
          Items: {cart.length}<br />
          Total: ${cartTotal}
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {books.map((book) => (
          <div key={book.bookID} className="col">
            <div className="card h-100 shadow-sm border-primary">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <ul className="list-unstyled">
                  <li><strong>Author:</strong> {book.author}</li>
                  <li><strong>Publisher:</strong> {book.publisher}</li>
                  <li><strong>ISBN:</strong> {book.isbn}</li>
                  <li><strong>Classification:</strong> {book.classification}</li>
                  <li><strong>Category:</strong> {book.category}</li>
                  <li><strong>Page Count:</strong> {book.pageCount}</li>
                  <li><strong>Price:</strong> ${book.price}</li>
                </ul>
                <button
                  className="btn btn-outline-success mt-2"
                  onClick={() =>
                    navigate(`/purchase/${book.title}/${book.bookID}`, { state: book })
                  }
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNumber}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNumber(1);
        }}
      />
      
    </>
  );
}

export default BookList;
