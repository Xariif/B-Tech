using BlogAPI.DTOs.Posts;
using BlogAPI.Models;
using BlogAPI.Repositories;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.GridFS;

namespace BlogAPI.Services
{
    public class PostsService
    {
        private readonly PostsRepository _postsRepository;

        public PostsService(PostsRepository postsRepository)
        {
            _postsRepository = postsRepository;
        }

        public async Task<Posts?> GetPostByIdAsync(string postId)
        {
            return await _postsRepository.FindFirstByIdAsync<Posts>(postId)!;
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByAuthorIdAsync(string authorId)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.AuthorId, ObjectId.Parse(authorId))
                      & Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postsRepository.FindAllAsync(filter);
        }



        public async Task<IEnumerable<Posts>> GetTopApprovedPostsAsync(DateTime from, DateTime to)
        {
            var filter = Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved)
                & Builders<Posts>.Filter.Gt(x => x.CreatedAt, from)
                & Builders<Posts>.Filter.Lt(x => x.CreatedAt, to);



            var sort = Builders<Posts>.Sort.Descending(x => x.Views);

            var findOptions = new FindOptions<Posts>
            {
                Sort = sort
            };



            return await _postsRepository.FindAllAsync(filter, findOptions);
        }

        public async Task CancelPostAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");


            if (post.Status != Status.ToConfirm || post.Status != Status.Aproved)
                throw new Exception("Post is not waiting for approval");

            post.Status = Status.Draft;

            await _postsRepository.UpdateAsync(post.Id.ToString(), post);
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByCategoryAsync(string category)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.Category, category)
                    & Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByTagAsync(string tag)
        {
            var filter = Builders<Posts>.Filter.AnyEq(x => x.Tags, tag)
                                & Builders<Posts>.Filter.Eq(x => x.Status, Status.Aproved);

            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetPostsByStatusAndAuthorIdAsync(Status status, ObjectId authorId)
        {

            var filter = Builders<Posts>.Filter.Eq(post => post.Status, status) &
                      Builders<Posts>.Filter.Eq(post => post.AuthorId, authorId);

            return await _postsRepository.FindAllAsync(filter);

        }

        public async Task<IEnumerable<Posts>> GetPostsByStatusAsync(Status status)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.Status, status);

            return await _postsRepository.FindAllAsync(filter);
        }

        public async Task<IEnumerable<Posts>> GetApprovedPostsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            var filter = Builders<Posts>.Filter.Gte(post => post.CreatedAt, startDate) &
                        Builders<Posts>.Filter.Lte(post => post.CreatedAt, endDate);


            return await _postsRepository.FindAllAsync(filter);
        }



        public async Task CreateDraftPostAsync(CreateDraftPostDTO newDraftPost, Status status, ObjectId authorId)
        {
            var post = new Posts
            {
                Id = ObjectId.GenerateNewId(),
                AuthorId = authorId,
                Category = newDraftPost.Category,
                Content = newDraftPost.Content,
                CreatedAt = DateTime.UtcNow,
                MainParentId = !string.IsNullOrEmpty(newDraftPost.MainParentId) ? ObjectId.Parse(newDraftPost.MainParentId) : null,
                Status = status,
                Tags = newDraftPost.Tags,
                Title = newDraftPost.Title,
                MainPhotoId = null,
                Views = 0,
                Likes = 0,
                Dislikes = 0
            };

            if (newDraftPost.MainImage != null)
            {
                if (newDraftPost.MainImage.ContentType != "image/jpeg")
                {
                    throw new Exception("Invalid image type");
                }

                var imgId = await _postsRepository.UploadFileAsync(newDraftPost.MainImage.FileName, newDraftPost.MainImage.OpenReadStream());
                post.MainPhotoId = imgId;
            }

            await _postsRepository.InsertOneAsync(post);
        }



        public async Task CreatePostAsync(CreatePostDTO newPost, Status status, ObjectId authorId)
        {

            var post = new Posts
            {
                Id = ObjectId.GenerateNewId(),
                AuthorId = authorId,
                Category = newPost.Category,
                Content = newPost.Content,
                CreatedAt = DateTime.UtcNow,
                MainParentId = !string.IsNullOrEmpty(newPost.MainParentId) ? ObjectId.Parse(newPost.MainParentId) : null,
                Status = status,
                Tags = newPost.Tags,
                Title = newPost.Title,
                Views = 0,
                Likes = 0,
                Dislikes = 0
            };

            if (newPost.MainImage.ContentType != "image/jpeg")
            {
                throw new Exception("Invalid image type");

            }
            var imgId = await _postsRepository.UploadFileAsync(newPost.MainImage.FileName, newPost.MainImage.OpenReadStream());
            post.MainPhotoId = imgId;

            await _postsRepository.InsertOneAsync(post);
        }

        public async Task UpdateDraftPostAsync(UpdateDraftPostDTO updatedPost)
        {
            var post = await GetPostByIdAsync(updatedPost.Id) ?? throw new Exception("Post doesn't exist");

            Posts updated = new()
            {
                Id = post.Id,
                MainParentId = null,
                AuthorId = post.AuthorId,
                Title = updatedPost.Title,
                Content = updatedPost.Content,
                Category = updatedPost.Category,
                Tags = updatedPost.Tags,
                CreatedAt = post.CreatedAt,
                Views = post.Views,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                Status = Status.Draft,
            };



            if (post.MainPhotoId != null)
            {
                await _postsRepository.DeleteFileAsync(post.MainPhotoId.ToString());
            }

            if (updatedPost.MainImage != null)
            {
                var imgId = await _postsRepository.UploadFileAsync(updatedPost.MainImage.FileName, updatedPost.MainImage.OpenReadStream());
                updated.MainPhotoId = imgId;
            }

            await _postsRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task UpdateAcceptedPostAsync(UpdatePostDTO updatedPost)
        {

            var post = await GetPostByIdAsync(updatedPost.Id) ?? throw new Exception("Post doesn't exist");

            Posts updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = updatedPost.Title,
                Views = post.Views,
                Category = updatedPost.Category,
                Content = updatedPost.Content,
                Tags = updatedPost.Tags,
                CreatedAt = post.CreatedAt,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Draft
            };

            //copy

            if (updatedPost.MainImage != null)
            {
                await _postsRepository.DeleteFileAsync(post.MainPhotoId.ToString());

                var imgId = await _postsRepository.UploadFileAsync(updatedPost.MainImage.FileName, updatedPost.MainImage.OpenReadStream());
                post.MainPhotoId = imgId;
            }

            await _postsRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task RejectPostAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");

            Posts updated = new()
            {
                Id = post.Id,
                AuthorId = post.AuthorId,
                Title = post.Title,
                Views = post.Views,
                Category = post.Category,
                Content = post.Content,
                Tags = post.Tags,
                CreatedAt = post.CreatedAt,
                Likes = post.Likes,
                Dislikes = post.Dislikes,
                MainParentId = post.MainParentId,
                Status = Status.Rejected
            };

            await _postsRepository.UpdateAsync(updated.Id.ToString(), updated);
        }

        public async Task AcceptPostAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");

            post.Status = Status.Aproved;

            await _postsRepository.UpdateAsync(post.Id.ToString(), post);


            if (post.MainParentId != null)
            {
                var oldPost = await GetPostByIdAsync(post.MainParentId.ToString());

                await _postsRepository.DeleteAsync<Posts>(oldPost.Id.ToString());
                await _postsRepository.DeleteFileAsync(oldPost.MainPhotoId.ToString());
            }
        }

        public async Task DeletePostAsync(string postId)
        {

            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");


            if (post.MainPhotoId != null)
                await _postsRepository.DeleteFileAsync(post.MainPhotoId.ToString());


            await _postsRepository.DeleteAsync<Posts>(postId);
        }

        public async Task<Byte[]> GetPostImageAsync(string photoId)
        {

            return await _postsRepository.DownloadFileAsync(photoId);
        }



        public async Task<GridFSFileInfo<ObjectId>> GetFileInfo(string photoId)
        {

            return await _postsRepository.GetFileInfoAsync(photoId);
        }

        public async Task<Posts> GetPostByMainPhotoIdAsync(string photoId)
        {
            var filter = Builders<Posts>.Filter.Eq(post => post.MainPhotoId, ObjectId.Parse(photoId));

            return await _postsRepository.FindFirstAsync<Posts>(filter);
        }


        public async Task IncreaseViewsAsync(string postId)
        {
            var post = await GetPostByIdAsync(postId) ?? throw new Exception("Post doesn't exist");

            post.Views++;

            await _postsRepository.UpdateAsync(post.Id.ToString(), post);
        }

    }
}