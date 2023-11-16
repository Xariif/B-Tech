export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

const getPostsRequest = () => {
	return {
		type: GET_POSTS_REQUEST,
	};
};

const getPostsSuccess = (posts) => {
	return {
		type: GET_POSTS_SUCCESS,
		payload: posts,
	};
};

const getPostsFailure = (error) => {
	return {
		type: GET_POSTS_FAILURE,
		payload: error,
	};
};

export { getPostsRequest, getPostsSuccess, getPostsFailure };
