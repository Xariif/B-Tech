using BlogAPI.Models;

namespace BlogAPI.DTOs.Likes
{
    public class LikesDTO
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string ItemId { get; set; }
        public bool IsLiked { get; set; }
        public LikeType Type { get; set; }
    }
}
