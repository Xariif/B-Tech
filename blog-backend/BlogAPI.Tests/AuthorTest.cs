using BlogAPI.DTOs.Author;
using BlogAPI.Services;

namespace BlogAPI.Tests
{
    public class AuthorTest
    {
        private readonly AuthorService _authorService;

        public AuthorTest()
        {
            _authorService = new AuthorService();
        }


        [Fact]
        public async Task CreateAuthorAsync_ShouldCreateAuthor()
        {
            // Arrange
            var newAuthorDTO = new NewAuthorDTO
            {
                Name = "Adam",
                Surname = "Czarnecki",
                Description = "Testowy opis",
                ActiveFrom = new DateTime(1999, 4, 12),

            };
            // Act
            await _authorService.CreateAuthorAsync(newAuthorDTO);

            // Assert


            var author = await _authorService.GetAuthorByNameSurnameAsync(newAuthorDTO.Name, newAuthorDTO.Surname);

            Assert.NotNull(author);
            Assert.Equal(newAuthorDTO.Name, author.Name);
            Assert.Equal(newAuthorDTO.Surname, author.Surname);
        }

        [Fact]
        public async Task GetAuthorByIdAsync_ShouldReturnAuthorDTO()
        {
            // Arrange
            var authorDTO = await _authorService.GetAuthorByNameSurnameAsync("Adam", "Czarnecki");

            // Act
            var result = await _authorService.GetAuthorByIdAsync(authorDTO.Id.ToString());

            // Assert
            var resultAuthorDTO = Assert.IsType<AuthorDTO>(result);
            Assert.Equal(authorDTO.Id, resultAuthorDTO.Id);
            Assert.Equal(authorDTO.Name, resultAuthorDTO.Name);
            Assert.Equal(authorDTO.Surname, resultAuthorDTO.Surname);
        }

        [Fact]
        public async Task GetAuthorByNameSurnameAsync_ShouldReturnAuthorDTO()
        {
            // Arrange
            string name = "Adam";
            string surname = "Czarnecki";
            // Act
            var result = await _authorService.GetAuthorByNameSurnameAsync(name, surname);

            // Assert
            Assert.IsType<AuthorDTO>(result);
            Assert.Equal(name, result.Name);
            Assert.Equal(surname, result.Surname);
        }

        [Fact]
        public async Task UpdateAuthorAsync_ShouldUpdateAuthor()
        {
            // Arrange
            var authorDTO = await _authorService.GetAuthorByNameSurnameAsync("Adam", "Czarnecki");

            authorDTO.Surname = "Nowicki";
            authorDTO.Description = "Testowy opis";

            // Act
            await _authorService.UpdateAuthorAsync(authorDTO);

            // Assert
            var author = await _authorService.GetAuthorByIdAsync(authorDTO.Id.ToString());

            Assert.NotNull(author);
            Assert.Equal(authorDTO.Name, author.Name);
            Assert.Equal(authorDTO.Surname, author.Surname);
            Assert.Equal(authorDTO.Description, author.Description);
        }





        [Fact]
        public async Task DeleteAuthorAsync_ShouldDeleteAuthor()
        {
            // Arrange

            var authorDTO = await _authorService.GetAuthorByNameSurnameAsync("Adam", "Nowicki");

            // Act
            await _authorService.DeleteAuthorAsync(authorDTO.Id.ToString());

            // Assert
            //how to check if is deleted? i return exception when author not found
            await Assert.ThrowsAsync<ArgumentException>(() => _authorService.GetAuthorByIdAsync(authorDTO.Id.ToString()));

        }
    }

}