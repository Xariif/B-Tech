using BlogAPI.Models;
using Microsoft.CodeAnalysis.Operations;

namespace BlogAPI.DTOs.Post
{
    public class PostDTO
    {
        public  string? Id { get; set; }
        public  string? Title { get; set; }
        public Models.File? Image { get; set; }
        public string? Content { get; set; }
        public  string? AuthorId { get; set; }
        public  string? Tag { get; set; }
        public  DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    }
}
