using BlogAPI.Models;
using Microsoft.CodeAnalysis.Operations;

namespace BlogAPI.DTOs.Post
{
    public class PostDto
    {
        public string? Id { get; set; }
        public string? MainParentId { get; set; }

        public string? Title { get; set; }
        public Models.File? Image { get; set; }
        public string? Content { get; set; }
        public string? AuthorId { get; set; } // Fix: Declare the property as nullable
        public string? Category { get; set; }
        public List<string>? Tags { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; } = DateTime.Now;
        public Status Status { get; set; }
    }
}

