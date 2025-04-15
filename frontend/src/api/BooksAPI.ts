// ✅ BooksAPI.ts
import { Book } from '../types/Books';

const baseUrl = 'https://bookstore-connors-backend-acd9c4axf2fngxhf.eastus-01.azurewebsites.net/Book';

interface FetchBooksResponse {
  books: Book[];
  totalBooks: number;
}

export const fetchBooks = async (
  pageSize: number,
  pageNumber: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((category) => `bookTypes=${encodeURIComponent(category)}`)
      .join('&');

    const url = `${baseUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}${
      selectedCategories.length ? `&${categoryParams}` : ''
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (book: Book): Promise<Book> => {
  try {
    const response = await fetch(`${baseUrl}/AddBook`, {
      // ✅ Fixed: Removed "/AddBook"
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting book:', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${baseUrl}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating book: ', error);
    throw error;
  }
};
