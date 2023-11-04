using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class PostLikeService : BaseService
    {



        public async Task LikePost(string postId)
        {
            //check if in _postLikeCollection exist document with postId and userId


            var filter = Builders<Post>.Filter.Eq("_id", ObjectId.Parse(postId));
            var update = Builders<Post>.Update.Inc("Likes", 1);

            await _postCollection.UpdateOneAsync(filter, update);
        }

        public async Task DislikePost(string postId)
        {
            var filter = Builders<Post>.Filter.Eq("_id", ObjectId.Parse(postId));
            var update = Builders<Post>.Update.Inc("Dislikes", 1);

            await _postCollection.UpdateOneAsync(filter, update);
        }

        public async Task RemoveLikeFromPost(string postId)
        {
            var filter = Builders<Post>.Filter.Eq("_id", ObjectId.Parse(postId));
            var update = Builders<Post>.Update.Inc("Likes", -1);

            await _postCollection.UpdateOneAsync(filter, update);
        }

        public async Task RemoveDislikeFromPost(string postId)
        {
            var filter = Builders<Post>.Filter.Eq("_id", ObjectId.Parse(postId));
            var update = Builders<Post>.Update.Inc("Dislikes", -1);

            await _postCollection.UpdateOneAsync(filter, update);
        }
    }
}
