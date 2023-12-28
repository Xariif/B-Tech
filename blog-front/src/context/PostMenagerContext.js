import React, {
  createContext,
  useMemo,
  useState,
  useReducer,
  useEffect,
} from "react";
import { useNotification } from "../components/hooks/useNotification";
import useService from "../services/posts/useService";
import useError from "../components/hooks/useError";

export const PostManagerContext = createContext();

const initialState = {
  draftPosts: null,
  newPost: null,
  approvedPosts: null,
  waitingPosts: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        [action.payload.type]: [
          ...state[action.payload.type],
          action.payload.post,
        ],
      };
    case "REMOVE_POST":
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter(
          (post) => post.id !== action.payload.id,
        ),
      };
    case "UPDATE_POST":
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((post) =>
          post.id === action.payload.post.id ? action.payload.post : post,
        ),
      };

    case "SET_POSTS":
      return { ...state, [action.payload.type]: action.payload.posts };
    default:
      return state;
  }
}

export function PostManagerProvider({ children }) {
  const { setLoader } = useNotification();
  const { handleError } = useError();
  const postsService = useService();
  const fetchDraftPostData = async () => {
    setLoader(true);
    const fetchPosts = async () => postsService.GetDraftPosts();

    const fetchImage = (post) => {
      if (!post.mainPhotoId) return null;
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
      if (!post.mainPhotoId) return null;

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

    return fetchPosts()
      .then((postsResponse) => {
        const fetchImagePromises = postsResponse.map(fetchImage);
        const fetchImageInfoPromises = postsResponse.map(fetchImageInfo);
        return Promise.all([
          Promise.all(fetchImagePromises),
          Promise.all(fetchImageInfoPromises),
        ]).then(() => {
          return postsResponse;
        });
      })
      .catch((error) => {
        handleError(error);
        return false;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const fetchApprovedPostData = async () => {
    setLoader(true);
    const fetchPosts = async () => postsService.GetApprovedPosts();

    const fetchImage = (post) => {
      if (!post.mainPhotoId) return null;
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
      if (!post.mainPhotoId) return null;

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

    return fetchPosts()
      .then((postsResponse) => {
        const fetchImagePromises = postsResponse.map(fetchImage);
        const fetchImageInfoPromises = postsResponse.map(fetchImageInfo);
        return Promise.all([
          Promise.all(fetchImagePromises),
          Promise.all(fetchImageInfoPromises),
        ]).then(() => {
          return postsResponse;
        });
      })
      .catch((error) => {
        handleError(error);
        return false;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const fetchWaitingPostData = async () => {
    setLoader(true);
    const fetchPosts = async () => postsService.GetPostWaitingForApproval();

    const fetchImage = (post) => {
      if (!post.mainPhotoId) return null;
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
      if (!post.mainPhotoId) return null;

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

    return fetchPosts()
      .then((postsResponse) => {
        const fetchImagePromises = postsResponse.map(fetchImage);
        const fetchImageInfoPromises = postsResponse.map(fetchImageInfo);
        return Promise.all([
          Promise.all(fetchImagePromises),
          Promise.all(fetchImageInfoPromises),
        ]).then(() => {
          return postsResponse;
        });
      })
      .catch((error) => {
        console.log(error);
        handleError(error);
        return false;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const addPost = (post, type) => {
    dispatch({ type: "ADD_POST", payload: { post, type } });
  };

  const removePost = (id, type) => {
    dispatch({ type: "REMOVE_POST", payload: { id, type } });
  };

  const updatePost = (post, type) => {
    dispatch({ type: "UPDATE_POST", payload: { post, type } });
  };

  const fetchApprovedPosts = async () => {
    const posts = await fetchApprovedPostData();

    if (posts) {
      dispatch({
        type: "SET_POSTS",
        payload: { posts, type: "approvedPosts" },
      });
    }
  };

  const fetchDraftPosts = async () => {
    const posts = await fetchDraftPostData();

    if (posts) {
      dispatch({
        type: "SET_POSTS",
        payload: { posts, type: "draftPosts" },
      });
    }
  };

  const fetchWaitingPosts = async () => {
    const posts = await fetchWaitingPostData();
    if (posts) {
      dispatch({
        type: "SET_POSTS",
        payload: { posts, type: "waitingPosts" },
      });
    }
  };

  const removeDraftPost = (id) => {
    dispatch({ type: "REMOVE_POST", payload: { id, type: "draftPosts" } });
  };

  const removeApprovedPost = (id) => {
    dispatch({ type: "REMOVE_POST", payload: { id, type: "approvedPosts" } });
  };

  const removeWaitingPost = (id) => {
    dispatch({ type: "REMOVE_POST", payload: { id, type: "waitingPosts" } });
  };

  const contextValue = useMemo(
    () => ({
      removeDraftPost,
      removeApprovedPost,
      removeWaitingPost,
      fetchDraftPosts,
      fetchApprovedPosts,
      fetchWaitingPosts,
      draftPosts: state.draftPosts,
      approvedPosts: state.approvedPosts,
      waitingPosts: state.waitingPosts,
    }),
    [
      removePost,
      updatePost,
      fetchDraftPosts,
      fetchApprovedPosts,
      fetchWaitingPosts,
      state.draftPosts,
      state.approvedPosts,
      state.waitingPosts,
    ],
  );

  return (
    <PostManagerContext.Provider value={contextValue}>
      {children}
    </PostManagerContext.Provider>
  );
}
