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

        [HttpGet]
        public IActionResult GetBooks(string sortOrder = "asc", int pageSize = 5, int pageNumber = 1)
        {
            IQueryable<Books> query = _bookContext.Books;

            // Sorting logic
            query = sortOrder.ToLower() == "desc"
                ? query.OrderByDescending(b => b.Title)
                : query.OrderBy(b => b.Title);

            // Pagination logic
            var pagedBooks = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalBooks = _bookContext.Books.Count();

            return Ok(new
            {
                Books = pagedBooks,
                TotalBooks = totalBooks
            });
        }


        
        // [HttpGet("Title/{title}")]
        // public IEnumerable<Books> Book()
        // {
        //     var something = _bookContext.Books.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        //     return something;
        // }
    }

    
}