// components/BookList.tsx
import { useEffect, useState } from 'react';
import { Book } from '../types/Books';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const bookTypeParams = selectedCategories
      .map((type) => `bookTypes=${encodeURIComponent(type)}`)
      .join('&');

    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNumber=${pageNumber}${
          selectedCategories.length > 0 ? '&' + bookTypeParams : ''
        }`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalBooks);
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNumber, selectedCategories]);

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

      <div className="my-4">
        <div className="btn-group" role="group">
          <button
            className="btn btn-secondary"
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`btn ${index + 1 === pageNumber ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setPageNumber(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-secondary"
            disabled={pageNumber === totalPages}
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="pageSizeSelect" className="form-label">Results per page:</label>
        <select
          id="pageSizeSelect"
          className="form-select w-auto"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNumber(1);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </>
  );
}

export default BookList;
