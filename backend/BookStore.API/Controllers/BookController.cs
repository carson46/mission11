using Microsoft.AspNetCore.Mvc;
using BookStore.API.Controllers.Data;
using BookStore.API.Data;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp) => _bookContext = temp;
        
        [HttpGet("GetProjectTypes")]
        public IActionResult GetBookTypes(int id)
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            
            return Ok(bookTypes);
        }

        [HttpGet]
        public IActionResult GetBooks(string sortOrder = "asc", int pageSize = 5, int pageNumber = 1, [FromQuery] List<string>? bookTypes = null)
        {
            IQueryable<Books> query = _bookContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category)); 
            }

            // Sorting logic
            query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            // Pagination logic
            var pagedBooks = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalBooks = query.Count();

            return Ok(new
            {
                Books = pagedBooks,
                TotalBooks = totalBooks
            });

        }
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Books book)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _bookContext.Books.Add(book);
            _bookContext.SaveChanges();
            return Ok(book);
        }


        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook (int bookID, [FromBody] Books updatedBook)
        {
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound();
            }

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.Category = updatedBook.Category;
            book.Price = updatedBook.Price;
            book.Publisher = updatedBook.Publisher;
            book.ISBN = updatedBook.ISBN;
            book.Classification = updatedBook.Classification;
            book.PageCount = updatedBook.PageCount;


            _bookContext.Books.Update(book);
            _bookContext.SaveChanges();
            return Ok(book);
        }
        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook (int bookID)
        {
            var book = _bookContext.Books.Find(bookID);
            if (book == null)
            {
                return NotFound();
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            return Ok(book);
        }
    }
}