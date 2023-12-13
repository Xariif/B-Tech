namespace BlogAPI.DTOs.Comment
{
    public class CommentDTO
    {
        public string Id { get; set; }
        public string AuthorId { get; set; }
        public string Name { get; set; }

        public string Surname { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Description { get; set; }
        public int Likes { get; set; } = 0;
        public int Dislikes { get; set; } = 0;
        public List<CommentDTO>? SubComments { get; set; }
    }
}
