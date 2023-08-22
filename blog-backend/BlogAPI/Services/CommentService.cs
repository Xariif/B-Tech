using BlogAPI.DTOs.Comment;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class CommentService : BaseService
    {

        public async Task AddCommentToPost(string postId, NewCommentDTO comment, string? parentCommentId = null)
        {




            if (parentCommentId != null)
            {

                var newComment = new Comment
                {
                    Id = ObjectId.GenerateNewId(),
                    PostId = ObjectId.Parse(postId),
                    AuthorId = ObjectId.Parse(comment.AuthorId),
                    Description = comment.Description,
                    CreatedAt = DateTime.Now,
                    Dislikes = 0,
                    Likes = 0,
                    SubComments = new List<Comment>()
                };

                await _commentCollection.InsertOneAsync(newComment);

            }
            else
            {
                var newComment = new Comment
                {
                    Id = ObjectId.GenerateNewId(),
                    PostId = ObjectId.Parse(postId),
                    AuthorId = ObjectId.Parse(comment.AuthorId),
                    Description = comment.Description,
                    CreatedAt = DateTime.Now,
                    Dislikes = 0,
                    Likes = 0,
                    SubComments = new List<Comment>()
                };

                //find in all nested comments and add new comment to it

                var filter = Builders<Comment>.Filter.Eq("_id", ObjectId.Parse(parentCommentId));
                var update = Builders<Comment>.Update.Push("SubComments", newComment);

                await _commentCollection.UpdateOneAsync(filter, update);

            }   
        }



        public async Task<List<CommentDTO>> GetCommentsByPostIdAsync(string id, int pageNumber, int pageSize)
        {
            int skip = (pageNumber - 1) * pageSize;
            var filter = Builders<Comment>.Filter.Eq("_id", id);
            var options = new FindOptions<Comment>
            {
                Limit = pageSize,
                Skip = skip
            };

            var comments = await _commentCollection.Find(filter).SortByDescending(c => c.CreatedAt).Skip(skip).Limit(pageSize).ToListAsync();


            List<CommentDTO> commentDTOs = comments.Select(async comment =>
            {

                var author = await GetByIdAsync(_authorCollection, comment.AuthorId.ToString());


                return new CommentDTO
                {
                    Id = comment.Id.ToString(),
                    Description = comment.Description,
                    Name = author.Name,
                    Surname = author.Surname,
                    CreatedAt = comment.CreatedAt,
                    Likes = comment.Likes,
                    Dislikes = comment.Dislikes
                };
            }).Select(x => x.Result).ToList();

            return commentDTOs;
        }

    }
}

