using BlogAPI.DTOs.Author;
using BlogAPI.Services;

namespace BlogAPI.Tests
{
    public class AuthorTest
    {
        private readonly UserService _userService;

        public AuthorTest()
        {
            _userService = new UserService();
        }




        [Fact]
        public async Task GetAuthorByNameSurnameAsync_ShouldReturnAuthorDTO()
        {
            // Arrange
            string name = "Adam";
            string surname = "Czarnecki";
            // Act
            var result = await _userService.GetUserByNameSurnameAsync(name, surname);

            // Assert
            Assert.IsType<UserDTO>(result);
            Assert.Equal(name, result.Name);
            Assert.Equal(surname, result.Surname);
        }

        [Fact]
        public async Task UpdateAuthorAsync_ShouldUpdateAuthor()
        {
            // Arrange
            var authorDTO = await _userService.GetUserByNameSurnameAsync("Adam", "Czarnecki");

            authorDTO.Surname = "Nowicki";
            authorDTO.Description = "Testowy opis";

            // Act
            await _userService.UpdateUserAsync(authorDTO);

            // Assert
            var author = await _userService.GetUserByUserIdAsync(authorDTO.UserId.ToString());

            Assert.NotNull(author);
            Assert.Equal(authorDTO.Name, author.Name);
            Assert.Equal(authorDTO.Surname, author.Surname);
            Assert.Equal(authorDTO.Description, author.Description);
        }





        [Fact]
        public async Task DeleteAuthorAsync_ShouldDeleteAuthor()
        {
            // Arrange

            var authorDTO = await _userService.GetUserByNameSurnameAsync("Adam", "Nowicki");

            // Act
            await _userService.DeleteUserAsync(authorDTO.UserId.ToString());

            // Assert
            //how to check if is deleted? i return exception when author not found
            await Assert.ThrowsAsync<ArgumentException>(() => _userService.GetUserByUserIdAsync(authorDTO.UserId.ToString()));

        }
    }

}