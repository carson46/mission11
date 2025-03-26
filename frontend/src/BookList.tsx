import { useEffect, useState } from 'react';
import { Book } from './types/Books';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalBooks);
      setTotalPages(Math.ceil(data.totalBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNumber]);

  return (
    <>
      <h1>Book List</h1>
      <br />

      {books.map((book) => (
        <div key={book.bookID} id="bookCard" className="card">
          <h2 className="card-title">{book.title}</h2>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {book.author}
              </li>
              <li>
                <strong>Publisher:</strong> {book.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {book.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {book.classification}
              </li>
              <li>
                <strong>Category:</strong> {book.category}
              </li>
              <li>
                <strong>Page Count:</strong> {book.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${book.price}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <div className="my-3">
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNumber(index + 1)}
            disabled={index + 1 === pageNumber}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          Next
        </button>
      </div>

      <label>
        Results per page:&nbsp;
        <select
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
      </label>
    </>
  );
}

export default BookList;
