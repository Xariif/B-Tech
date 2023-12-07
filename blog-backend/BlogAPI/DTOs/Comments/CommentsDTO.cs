namespace BlogAPI.DTOs.Comments
{
    public class CommentsDTO
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string PostId { get; set; }
        public string Content { get; set; }
        public int Likes { get; set; } = 0;
        public int Dislikes { get; set; } = 0;
        public DateTime CreatedAt { get; set; }
    }
}
