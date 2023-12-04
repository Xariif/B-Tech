using System.Xml.Linq;
using BlogAPI.DTOs.Comment;
using BlogAPI.Interfaces.Repositories;
using BlogAPI.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace BlogAPI.Services
{
    public class CommentService 
    {
        private readonly CommentRepository _commentRepository;

        public CommentService(CommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }


     

    }
}

