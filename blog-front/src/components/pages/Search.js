import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import usePostService from "../../services/posts/useService";
import Loading from "../ui/Loading";
import { useNotification } from "../hooks/useNotification";
import PostBigImg from "../ui/PostBigImg";
import useError from "../hooks/useError";
import useAuthorService from "../../services/author/useService";

export default function Search(props) {
  const { term } = useParams();
  const postsService = usePostService();
  const notification = useNotification();
  const authorService = useAuthorService();
  const [searchResults, setSearchResults] = useState();
  const { handleError } = useError();

  useEffect(() => {
    if (term) {
      notification.setLoader(true);

      const fetchImage = (post) => {
        return postsService
          .GetImage({ id: post.mainPhotoId })
          .then((image) => {
            post.image = image;
          })
          .catch((error) => {
            post.image = null;
            handleError(error);
          });
      };

      const fetchImageInfo = (post) => {
        return postsService
          .GetImageInfo({ id: post.mainPhotoId })
          .then((imageInfo) => {
            post.imageInfo = imageInfo;
          })
          .catch((error) => {
            post.imageInfo = null;
            handleError(error);
          });
      };

      const fetchAuthorAvatar = (post) => {
        return authorService
          .GetAvatarByAuthorId({ id: post.authorId })
          .then((avatar) => {
            post.authorAvatar = avatar;
          })
          .catch((error) => {
            post.authorAvatar = null;
            handleError(error);
          });
      };

      const fetchPosts = async () =>
        postsService.SearchForPhrase({ phrase: term });

      fetchPosts()
        .then((postsResponse) => {
          const fetchImagePromises = postsResponse.map(fetchImage);
          const fetchImageInfoPromises = postsResponse.map(fetchImageInfo);
          const fetchAuthorAvatarPromises =
            postsResponse.map(fetchAuthorAvatar);
          return Promise.all([
            Promise.all(fetchImagePromises),
            Promise.all(fetchImageInfoPromises),
            Promise.all(fetchAuthorAvatarPromises),
          ]).then(() => {
            setSearchResults(postsResponse);
          });
        })
        .catch((error) => {
          handleError(error);
          setSearchResults(false);
        })
        .finally(() => {
          notification.setLoader(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [term]);

  return (
    <Box>
      <Typography variant="h3">Searching for term: {term}</Typography>
      <Paper>
        {searchResults &&
          searchResults.map((post) => (
            <div key={post.id}>
              <PostBigImg post={post} />
            </div>
          ))}
      </Paper>
    </Box>
  );
}
