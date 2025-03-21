using BookStore.API.Data;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Controllers.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Books> Books { get; set; }
}