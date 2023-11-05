namespace BlogAPI.DTOs.Comment
{
    public class NewCommentDTO
    {
        public required string PostId { get; set; }
        public required string AuthorId { get; set; }
        public required string Description { get; set; }  

    }
}