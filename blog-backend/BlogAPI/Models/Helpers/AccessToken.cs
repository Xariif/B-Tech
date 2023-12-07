namespace BlogAPI.Models
{
    public class AccessToken
    {
        public string? Token { get; set; }
        public string? Scope { get; set; }
        public int? ExpiresIn { get; set; }
        public string? TokenType { get; set; }
    }
}
