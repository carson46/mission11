using System.ComponentModel.DataAnnotations;
namespace BookStore.API.Data;

public class Books
{
    [Key]
    public int BookID { get; set; }
    [Required]
    public string Title { get; set; }
    public string? Author { get; set; }
    public string? Publisher { get; set; }
    public int? ISBN { get; set; }
    public string? Classification  { get; set; }
    public string? Category { get; set; }
    public int? PageCount { get; set; }
    public int? Price { get; set; }
    
}