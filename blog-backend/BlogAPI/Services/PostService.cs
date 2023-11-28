using BlogAPI.DTOs.Post;
using BlogAPI.Interfaces.Services;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class PostService : BaseService, IPostService
    {
        async Task IPostService.ApprovePost(string postId)
        {
            var filter = Builders<Post>.Filter.Eq(x => x.Id, ObjectId.Parse(postId));
            var update = Builders<Post>.Update.Set(x => x.Approved, true);

            await _postCollection.UpdateOneAsync(filter, update);
        }

        Task IPostService.CreatePostDraft(PostDTO postDTO)
        {
            throw new NotImplementedException();
        }

        Task IPostService.DeletePostDraft(string postId)
        {
            throw new NotImplementedException();
        }

        Task<PostDTO> IPostService.GetApprovedPostById(string postId)
        {
            throw new NotImplementedException();
        }

        Task<List<PostDTO>> IPostService.GetApprovedPosts()
        {
            throw new NotImplementedException();
        }

        Task<List<PostDTO>> IPostService.GetApprovedPostsByAuthorId(string authorId)
        {
            throw new NotImplementedException();
        }

        Task<List<PostDTO>> IPostService.GetApprovedPostsByCategory(string category)
        {
            throw new NotImplementedException();
        }

        Task<PostDTO> IPostService.GetDraftPostByAuthor(string authorId)
        {
            throw new NotImplementedException();
        }

        Task<List<PostDTO>> IPostService.GetDraftPostsByAuthrId(string authorId)
        {
            throw new NotImplementedException();
        }

        Task<List<PostDTO>> IPostService.GetPostWaitingForApproval()
        {
            throw new NotImplementedException();
        }

        Task IPostService.RejestPost(string postId)
        {
            throw new NotImplementedException();
        }

        Task IPostService.SendPostToApprove(string postId)
        {
            throw new NotImplementedException();
        }

        Task IPostService.UpdatePostDraft(PostDTO postDTO)
        {
            throw new NotImplementedException();
        }
    }
}
