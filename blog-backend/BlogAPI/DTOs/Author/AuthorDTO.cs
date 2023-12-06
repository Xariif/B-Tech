﻿using BlogAPI.Models;

namespace BlogAPI.DTOs.Author;

public class AuthorDto
{
    public string? Id { get; set; }
    public string? Description { get; set; }
    public SocialMedia? SocialMedia { get; set; }
    public string? UserId { get; set; }
}